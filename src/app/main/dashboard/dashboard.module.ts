import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {TranslateModule} from '@ngx-translate/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgApexchartsModule} from 'ng-apexcharts';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';

import {CoreCommonModule} from '@core/common.module';

import {DashboardService} from 'app/main/dashboard/dashboard.service';

import {AdminComponent} from 'app/main/dashboard/admin/admin.component';
import {AuthAdminGuard} from '../../helpers/guards/auth-admin.guard';
import {Role} from '../../models/enum/role';
import {AuthManagerGuard} from '../../helpers/guards/auth-manager.guard';
import {AuthPhotographerGuard} from '../../helpers/guards/auth-photographer.guard';
import {AuthClientGuard} from '../../helpers/guards/auth-client.guard';
import {ManagerComponent} from './manager/manager.component';
import {PhotographerComponent} from './photographer/photographer.component';
import {ClientComponent} from './client/client.component';
import {ProfileModule} from '../pages/profile/profile.module';

const routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthAdminGuard],
    // data: {roles: [Role.ADMIN], animation: 'danalytics'},
    // resolve: {
    //   css: DashboardService,
    // }
    children: [
      { path: 'profile',
        loadChildren: () => import('../pages/profile/profile.module').then(m => m.ProfileModule)},

    ]
  },
  {
    path: 'manager',
    component: ManagerComponent,
    canActivate: [AuthManagerGuard],
    data: {roles: [Role.MANAGER], animation: 'danalytics'},
    resolve: {
      css: DashboardService,
    }
  },
  {
    path: 'photographer',
    component: PhotographerComponent,
    canActivate: [AuthPhotographerGuard],
    data: {roles: [Role.PHOTOGRAPHER], animation: 'danalytics'},
    resolve: {
      css: DashboardService,
    }
  },
  {
    path: 'client',
    component: ClientComponent,
    canActivate: [AuthClientGuard],
    data: {roles: [Role.CLIENT], animation: 'danalytics'},
    resolve: {
      css: DashboardService,
    }
  }
];

@NgModule({
  declarations: [
    AdminComponent,
    ManagerComponent,
    PhotographerComponent,
    ClientComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    NgbModule,
    PerfectScrollbarModule,
    CoreCommonModule,
    NgApexchartsModule
  ],
  providers: [DashboardService],
  exports: [
    AdminComponent,
    ManagerComponent,
    PhotographerComponent,
    ClientComponent
  ]
})
export class DashboardModule {
}
