import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManagerComponent} from './manager/manager.component';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";


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
    ]),
    FormsModule
  ]
})
export class ManagerModule {
}
