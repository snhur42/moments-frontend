import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminComponent} from './admin/admin.component';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ClientAdminComponent} from './client-admin/client-admin.component';
import {ManagerAdminComponent} from './manager-admin/manager-admin.component';
import {PhotographerAdminComponent} from './photographer-admin/photographer-admin.component';


@NgModule({
  declarations: [
    AdminComponent,
    ClientAdminComponent,
    ManagerAdminComponent,
    PhotographerAdminComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: AdminComponent, children: [
          {path: 'managers', component: ManagerAdminComponent},
          {path: 'clients', component: ClientAdminComponent},
          {path: 'photographers', component: PhotographerAdminComponent},
        ]
      }
    ]),
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminModule {
}
