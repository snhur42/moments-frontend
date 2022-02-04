import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/auth/login/login.component";
import {ErrorComponent} from "./pages/auth/error/error.component";
import {AuthAdminGuard} from "./core/guards/auth-admin.guard";
import {AuthClientGuard} from "./core/guards/auth-client.guard";
import {AuthManagerGuard} from "./core/guards/auth-manager.guard";
import {AuthPhotographerGuard} from "./core/guards/auth-photographer.guard";
import {ClientRegistrationComponent} from "./pages/auth/client-registration/client-registration.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'client_reg', component: ClientRegistrationComponent},
  {path: 'admin_panel', loadChildren: () => import('./pages/dashboards/admin/admin.module').then(m => m.AdminModule), canActivate: [AuthAdminGuard]},
  {path: 'client_panel', loadChildren: () => import('./pages/dashboards/client/client.module').then(m => m.ClientModule), canActivate: [AuthClientGuard]},
  {path: 'manager_panel', loadChildren: () => import('./pages/dashboards/manager/manager.module').then(m => m.ManagerModule), canActivate: [AuthManagerGuard]},
  {path: 'photographer_panel', loadChildren: () => import('./pages/dashboards/photographer/photographer.module').then(m => m.PhotographerModule), canActivate: [AuthPhotographerGuard]},
  {path: 'error', component: ErrorComponent},
  {path: '**', redirectTo: '/error'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
