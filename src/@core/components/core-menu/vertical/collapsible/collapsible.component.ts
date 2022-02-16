import {ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

import {Subject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';

import {CoreMenuItem} from '@core/types';
import {Role} from '../../../../../app/models/enum/role';
import {LocalStorageService} from '../../../../../app/helpers/service/local-storage.service';


@Component({
  selector: '[core-menu-vertical-collapsible]',
  templateUrl: './collapsible.component.html'
})
export class CoreMenuVerticalCollapsibleComponent implements OnInit, OnDestroy {
  currentUserRole: Role;

  @Input()
  item: CoreMenuItem;

  @HostBinding('class.open')
  public isOpen = false;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {Router} _router
   * @param {ChangeDetectorRef} _changeDetectorRef
   * @param {LocalStorageService} _localStorageService
   */
  constructor(
    private _router: Router,
    private _changeDetectorRef: ChangeDetectorRef,
    private _localStorageService: LocalStorageService
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  // Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.currentUserRole = this._localStorageService.getRole()
    // Listen for router events and expand
    this._router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((event: NavigationEnd) => {
        // Confirm if the urlAfterRedirects can be found in one of the children of this item
        if (this.confirmUrlInChildren(this.item, event.urlAfterRedirects)) {
          this.expand();
        } else {
          this.collapse();
        }
      });

    // Check if the url can be found in one of the children of this item
    // Required for onInit case (i.e switching theme customizer menu layout)
    if (this.confirmUrlInChildren(this.item, this._router.url)) {
      this.expand();
    } else {
      this.collapse();
    }
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  // Public methods
  // -----------------------------------------------------------------------------------------------------


  /**
   * Toggle collapse
   *
   * @param e
   */
  toggleOpen(e): void {
    e.preventDefault();

    this.isOpen = !this.isOpen;
  }

  /**
   * Expand the collapsible menu
   */
  expand(): void {
    if (this.isOpen) {
      return;
    }

    this.isOpen = true;

    // Mark for check
    this._changeDetectorRef.markForCheck();

  }

  /**
   * Collapse the collapsible menu
   */
  collapse(): void {
    if (!this.isOpen) {
      return;
    }

    this.isOpen = false;

    // Mark for check
    this._changeDetectorRef.markForCheck();

  }

  /**
   * Confirms if the provided url can be found in one of the given parent's children
   *
   * @param parent
   * @param url
   * @returns {boolean}
   */
  confirmUrlInChildren(parent, url): boolean {
    const children = parent.children;

    // Return false if parent don't have any children
    if (!children) {
      return false;
    }

    // Loop all the children
    for (const child of children) {
      // If children has child (Sub to sub item url)
      if (child.children) {
        // Call function again with child
        if (this.confirmUrlInChildren(child, url)) {
          return true;
        }
      }

      // If child.url is same as provided url
      if (child.url === url || url.includes(child.url)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Check if the provided parent has the provided item in one of its children
   *
   * @param parent
   * @param item
   * @returns {boolean}
   */
  confirmItemInChildren(parent, item): boolean {
    const children = parent.children;

    // Return false if parent don't have any children
    if (!children) {
      return false;
    }

    // Return true parent has the provided item in one of its children
    if (children.indexOf(item) > -1) {
      return true;
    }

    for (const child of children) {
      if (child.children) {
        // Call function again with child (for sub to sub item)
        if (this.confirmItemInChildren(child, item)) {
          return true;
        }
      }
    }

    return false;
  }
}
