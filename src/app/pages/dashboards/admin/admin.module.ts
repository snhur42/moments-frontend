import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: AdminComponent, children: [
          // {path: 'profile', component: UserProfile}
        ]
      }
    ])
  ]
})
export class AdminModule { }
