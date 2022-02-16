import {Component, HostBinding, HostListener, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {MediaObserver} from '@angular/flex-layout';

import * as _ from 'lodash';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';

import {CoreSidebarService} from '@core/components/core-sidebar/core-sidebar.service';
import {CoreConfigService} from '@core/services/config.service';
import {CoreMediaService} from '@core/services/media.service';

import {Router} from '@angular/router';
import {User} from '../../../models/user/user';
import {AuthenticationService} from '../../../helpers/service/authentication.service';
import {UserService} from '../../../helpers/service/user.service';
import {LocalStorageService} from '../../../helpers/service/local-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit, OnDestroy {
  public horizontalMenu: boolean;
  public hiddenMenu: boolean;

  public coreConfig: any;
  public currentSkin: string;
  public prevSkin: string;

  public currentUser: User;

  public navigation: any;
  public selectedLanguage: any;

  @HostBinding('class.fixed-top')
  public isFixed = false;

  @HostBinding('class.navbar-static-style-on-scroll')
  public windowScrolled = false;
  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {Router} _router
   * @param {UserService} _userService
   * @param {LocalStorageService} _localStorageStorage
   * @param {UserService} _authenticationService
   * @param {CoreConfigService} _coreConfigService
   * @param {CoreSidebarService} _coreSidebarService
   * @param {CoreMediaService} _coreMediaService
   * @param {MediaObserver} _mediaObserver
   * @param {TranslateService} _translateService
   */
  constructor(
    private _router: Router,
    private _userService: UserService,
    private _localStorageStorage: LocalStorageService,
    private _authenticationService: AuthenticationService,
    private _coreConfigService: CoreConfigService,
    private _coreMediaService: CoreMediaService,
    private _coreSidebarService: CoreSidebarService,
    private _mediaObserver: MediaObserver,
    public _translateService: TranslateService
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  // Add .navbar-static-style-on-scroll on scroll using HostListener & HostBinding
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (
      (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) &&
      this.coreConfig.layout.navbar.type == 'navbar-static-top' &&
      this.coreConfig.layout.type == 'horizontal'
    ) {
      this.windowScrolled = true;
    } else if (
      (this.windowScrolled && window.pageYOffset) ||
      document.documentElement.scrollTop ||
      document.body.scrollTop < 10
    ) {
      this.windowScrolled = false;
    }
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle sidebar open
   *
   * @param key
   */
  toggleSidebar(key): void {
    this._coreSidebarService.getSidebarRegistry(key).toggleOpen();
  }


  /**
   * Logout method
   */
  logout() {
    this._authenticationService.logout();
    this._router.navigate(['/']);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    if (this._localStorageStorage.isAuthenticated()){
      this._userService.getUserById().subscribe(x => (this.currentUser = x));
    }

    // get the currentUser details from localStorage
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Subscribe to the config changes
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
      this.horizontalMenu = config.layout.type === 'horizontal';
      this.hiddenMenu = config.layout.menu.hidden === true;
      this.currentSkin = config.layout.skin;

      // Fix: for vertical layout if default navbar fixed-top than set isFixed = true
      if (this.coreConfig.layout.type === 'vertical') {
        setTimeout(() => {
          if (this.coreConfig.layout.navbar.type === 'fixed-top') {
            this.isFixed = true;
          }
        }, 0);
      }
    });

    // Horizontal Layout Only: Add class fixed-top to navbar below large screen
    if (this.coreConfig.layout.type == 'horizontal') {
      // On every media(screen) change
      this._coreMediaService.onMediaUpdate.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {
        const isFixedTop = this._mediaObserver.isActive('bs-gt-xl');
        if (isFixedTop) {
          this.isFixed = false;
        } else {
          this.isFixed = true;
        }
      });
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
}
