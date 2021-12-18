import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ErrorComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
