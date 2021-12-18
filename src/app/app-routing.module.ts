import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/auth/login/login.component";
import {ErrorComponent} from "./pages/auth/error/error.component";
import {ClientModule} from "./pages/dashboards/client/client.module";
import {ManagerModule} from "./pages/dashboards/manager/manager.module";
import {PhotographerModule} from "./pages/dashboards/photographer/photographer.module";

// @ts-ignore
// @ts-ignore
const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'admin_panel', loadChildren: () => import('./pages/dashboards/admin/admin.module').then(m => m.AdminModule)},
  {path: 'client_panel', loadChildren: () => import('./pages/dashboards/client/client.module').then(m => m.ClientModule)},
  {path: 'manager_panel', loadChildren: () => import('./pages/dashboards/manager/manager.module').then(m => m.ManagerModule)},
  {path: 'photographer_panel', loadChildren: () => import('./pages/dashboards/photographer/photographer.module').then(m => m.PhotographerModule)},
  {path: 'error', component: ErrorComponent},
  {path: '**', redirectTo: '/error'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
