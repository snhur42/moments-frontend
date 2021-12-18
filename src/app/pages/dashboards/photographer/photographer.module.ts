import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotographerComponent } from './photographer/photographer.component';
import {RouterModule} from "@angular/router";
import {ManagerComponent} from "../manager/manager/manager.component";



@NgModule({
  declarations: [
    PhotographerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: PhotographerComponent, children: [
          // {path: 'profile', component: UserProfile}
        ]
      }
    ])
  ]
})
export class PhotographerModule { }
