import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {CoreCommonModule} from '@core/common.module';
import {AuthLoginComponent} from './auth-login/auth-login.component';
import {AuthRegisterComponent} from './auth-register/auth-register.component';
import {AuthResetPasswordComponent} from './auth-reset-password/auth-reset-password.component';
import {AuthForgotPasswordComponent} from './auth-forgot-password/auth-forgot-password.component';

const routes: Routes = [
  {
    path: '', component: AuthLoginComponent},

      {
        path: 'register',
        component: AuthRegisterComponent
      },
      {
        path: 'reset-password',
        component: AuthResetPasswordComponent
      },
      {
        path: 'forgot-password',
        component: AuthForgotPasswordComponent
      }
    ]


@NgModule({
  declarations: [
    AuthLoginComponent,
    AuthRegisterComponent,
    AuthForgotPasswordComponent,
    AuthResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    CoreCommonModule
  ]
})
export class AuthenticationModule {
}
