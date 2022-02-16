import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {CoreConfigService} from '@core/services/config.service';
import {AuthenticationService} from '../../../../helpers/service/authentication.service';
import {LocalStorageService} from '../../../../helpers/service/local-storage.service';
import {Router} from '@angular/router';
import {Role} from '../../../../models/enum/role';

@Component({
  selector: 'app-helpers-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthLoginComponent implements OnInit {
  //  Public
  public coreConfig: any;
  public loginForm: FormGroup;
  public submitted = false;
  public passwordTextType: boolean;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {FormBuilder} _formBuilder
   * @param {Router} _router
   * @param {LocalStorageService} _localStorageService
   * @param {AuthenticationService} _authService
   */
  constructor(private _coreConfigService: CoreConfigService,
              private _formBuilder: FormBuilder,
              private _router: Router,
              private _localStorageService: LocalStorageService,
              private _authService: AuthenticationService) {
    this._unsubscribeAll = new Subject();

    // Configure the layout
    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        menu: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        customizer: false,
        enableLocalStorage: false
      }
    };
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  /**
   * Toggle password
   */
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  /**
   * On Submit
   */
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    } else {
      this._authService.login(
        this.loginForm.value.email,
        this.loginForm.value.password
      ).subscribe({
        next: data => {
          if (data.success) {
            this.submitted = false
            this._localStorageService.saveToken(data.accessToken);
            console.log(AuthLoginComponent.getUserRole(this._localStorageService.getRole()))
            this._router.navigate([AuthLoginComponent.getUserRole(this._localStorageService.getRole())]);
          } else {
            this.submitted = true
          }
        },
        error: err => {
          console.log('Login error: ', err);
        }
      });
    }
  }

  private static getUserRole(role: string): string {
    if (role == Role.ADMIN) {
      return "dashboard/admin";
    } else if (role == Role.MANAGER) {
      return "dashboard/manager";
    } else if (role == Role.CLIENT) {
      return "dashboard/client";
    } else if (role == Role.PHOTOGRAPHER) {
      return "dashboard/photographer";
    } else {
      return "error";
    }
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // Subscribe to config changes
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
    });
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
