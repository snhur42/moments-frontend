import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManagerComponent} from './manager/manager.component';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


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
        FormsModule,
        ReactiveFormsModule
    ]
})
export class ManagerModule {
}
