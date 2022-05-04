import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {CoreConfigService} from '@core/services/config.service';
import {City} from '../../../models/enum/city';
import {AuthenticationService} from '../../../helpers/service/authentication.service';
import {Role} from '../../../models/enum/role';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

@Component({
  selector: 'app-helpers-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthRegisterComponent implements OnInit {
  // Public
  public coreConfig: any;
  public passwordTextType: boolean;
  public passwordCheckTextType: boolean;
  public isPasswordNotSame: boolean;
  public registerForm: FormGroup;
  public submitted = false;
  city = City;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {FormBuilder} _formBuilder
   * @param {Router} _router
   * @param {AuthenticationService} _authenticationService
   * @param {NgbModal} modalService
   */
  constructor(private _coreConfigService: CoreConfigService,
              private _formBuilder: FormBuilder,
              private _router: Router,
              private _authenticationService: AuthenticationService,
              private modalService: NgbModal
  ) {
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
    return this.registerForm.controls;
  }

  /**
   * Toggle password
   */
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  togglePasswordCheckTextType() {
    this.passwordCheckTextType = !this.passwordCheckTextType;
  }

  /**
   * On Submit
   */
  onSubmit(modalSuccess) {
    this.submitted = true;

    if( this.registerForm.value.password != this.registerForm.value.password_check){
      this.isPasswordNotSame = true;
      return;
    } else {
      this.isPasswordNotSame = false;
    }

    // stop here if form is invalid
    if (this.registerForm.invalid || !this.registerForm.value.accept) {
      return;
    }

    this._authenticationService.createClient(
      this.registerForm.value.firstName,
      this.registerForm.value.lastName,
      this.registerForm.value.email,
      this.registerForm.value.phone,
      this.registerForm.value.city,
      this.registerForm.value.password,
      Role.CLIENT
    ).subscribe({
      next: data => {
        if (data) {
          this.modalOpenSuccess(modalSuccess);
        }
      },
      error: err => {
        console.log('Reg error: ', err);
      }
    })

  }

  // modal Open Success
  modalOpenSuccess(modalSuccess) {
    this.modalService.open(modalSuccess, {
      centered: true,
      windowClass: 'modal modal-success'
    });
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------


  /**
   * On init
   */
  ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
      firstName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(15)])],
      lastName: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(15)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      phone: ['', Validators.compose([Validators.required, Validators.pattern('[- +()0-9]{12}')])],
      city: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      password_check: ['', Validators.compose([Validators.required])],
      accept: ['', Validators.compose([Validators.required])]
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
