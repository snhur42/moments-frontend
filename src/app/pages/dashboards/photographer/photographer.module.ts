import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PhotographerComponent} from './photographer/photographer.component';
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";


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
    ]),
    ReactiveFormsModule
  ]
})
export class PhotographerModule {
}
