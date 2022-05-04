import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {TranslateModule} from '@ngx-translate/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgApexchartsModule} from 'ng-apexcharts';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';

import {CoreCommonModule} from '@core/common.module';

import {PagesService} from 'app/pages/pages.service';

import {AdminComponent} from 'app/pages/dashboards/admin/admin.component';
import {AuthAdminGuard} from '../helpers/guards/auth-admin.guard';
import {Role} from '../models/enum/role';
import {AuthManagerGuard} from '../helpers/guards/auth-manager.guard';
import {AuthPhotographerGuard} from '../helpers/guards/auth-photographer.guard';
import {AuthClientGuard} from '../helpers/guards/auth-client.guard';
import {ManagerComponent} from './dashboards/manager/manager.component';
import {PhotographerComponent} from './dashboards/photographer/photographer.component';
import {ClientComponent} from './dashboards/client/client.component';
import {ContentHeaderModule} from '../layout/components/content-header/content-header.module';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule} from '@angular/forms';
import {Ng2FlatpickrModule} from 'ng2-flatpickr';
import {PrivacyPolicyComponent} from './privacy-policy/privacy-policy.component';
import {PricingComponent} from './pricing/pricing.component';
import {FaqComponent} from './faq/faq.component';
import {AuthLoginComponent} from './authentication/auth-login/auth-login.component';
import {AuthRegisterComponent} from './authentication/auth-register/auth-register.component';
import {AuthForgotPasswordComponent} from './authentication/auth-forgot-password/auth-forgot-password.component';
import {ErrorComponent} from './error/error.component';
import {ProfileComponent} from './profile/profile.component';
import { TestComponent } from './test/test.component';

const routes = [
  {path: '', component: AuthLoginComponent},
  {path: 'register_client', component: AuthRegisterComponent},
  {path: 'forgot-password', component: AuthForgotPasswordComponent},
  {path: 'privacy-policy', component: PrivacyPolicyComponent},
  {path: 'error', component: ErrorComponent},
  {
    path: 'dashboard',
    children: [
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthAdminGuard],
        children: [
          {
            path: 'profile',
            component: TestComponent,
            canActivate: [AuthAdminGuard]
          },
        ]
      },
      {
        path: 'manager',
        component: ManagerComponent,
        canActivate: [AuthManagerGuard],
        data: {roles: [Role.MANAGER], animation: 'danalytics'},
        resolve: {
          css: PagesService,
        }
      },
      {
        path: 'photographer',
        component: PhotographerComponent,
        canActivate: [AuthPhotographerGuard],
        data: {roles: [Role.PHOTOGRAPHER], animation: 'danalytics'},
        resolve: {
          css: PagesService,
        }
      },
      {
        path: 'client',
        component: ClientComponent,
        canActivate: [AuthClientGuard],
        data: {roles: [Role.CLIENT], animation: 'danalytics'},
        resolve: {
          css: PagesService,
        }
      }
    ]
  }
  ,
  {
    path: 'pricing',
    component: PricingComponent,
    canActivate: [AuthAdminGuard],
    data: {animation: 'pricing'}
  },
  {
    path: 'faq',
    component: FaqComponent,
    data: {animation: 'faq'}
  },

  {
    path: 'profile',
    component: ProfileComponent,
    // canActivate: [AuthGuard],
    // resolve: {
    //   accountSetting: ProfileService
    // },
    data: {animation: 'profile'}
  }
];

@NgModule({
  declarations: [
    AdminComponent,
    ManagerComponent,
    PhotographerComponent,
    ClientComponent,
    PricingComponent,
    AuthForgotPasswordComponent,
    AuthLoginComponent,
    AuthRegisterComponent,
    ErrorComponent,
    FaqComponent,
    PricingComponent,
    PrivacyPolicyComponent,
    ProfileComponent,
    TestComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    NgbModule,
    PerfectScrollbarModule,
    CoreCommonModule,
    NgApexchartsModule,
    CommonModule,
    CoreCommonModule,
    ContentHeaderModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    Ng2FlatpickrModule
  ],
  providers: [PagesService],
  exports: [
    AdminComponent,
    ManagerComponent,
    PhotographerComponent,
    ClientComponent
  ]
})
export class PagesModule {
}
