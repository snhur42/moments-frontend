import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientComponent} from './client/client.component';
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    ClientComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: ClientComponent, children: [
          // {path: 'profile', component: UserProfile}
        ]
      }
    ])
  ]
})
export class ClientModule {
}
