import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerComponent } from './manager/manager.component';
import {RouterModule} from "@angular/router";
import {AdminComponent} from "../admin/admin/admin.component";



@NgModule({
  declarations: [
    ManagerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: ManagerComponent, children: [
          // {path: 'profile', component: UserProfile}
        ]
      }
    ])
  ]
})
export class ManagerModule { }
