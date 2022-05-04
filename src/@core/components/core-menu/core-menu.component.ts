import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

import {Subject} from 'rxjs';
import {Role} from '../../../app/models/enum/role';
import {LocalStorageService} from '../../../app/helpers/service/local-storage.service';
import { menu } from 'app/menu/menu';


@Component({
  selector: '[core-menu]',
  templateUrl: './core-menu.component.html',
  styleUrls: ['./core-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoreMenuComponent implements OnInit {
  currentUserRole: Role;

  @Input()
  layout = 'vertical';

  @Input()
  menu: any;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   *
   * @param {ChangeDetectorRef} _changeDetectorRef
   * @param {LocalStorageService}_localStorageService
   */
  constructor(private _changeDetectorRef: ChangeDetectorRef, private _localStorageService: LocalStorageService) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  // Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Set the menu either from the input or from the service
    this.menu = menu;
    if(this._localStorageService.isAuthenticated()){
      this.currentUserRole = this._localStorageService.getRole();
    }
  }
}
