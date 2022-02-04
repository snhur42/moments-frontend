import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LayersModule} from "./layers/layers.module";
import {RouterModule} from "@angular/router";
import {AuthModule} from "./pages/auth/auth.module";
import {AdminModule} from "./pages/dashboards/admin/admin.module";
import {ClientModule} from "./pages/dashboards/client/client.module";
import {PhotographerModule} from "./pages/dashboards/photographer/photographer.module";
import {ManagerModule} from "./pages/dashboards/manager/manager.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {authInterceptorProviders} from "./core/interceptors/auth.interceptor";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./material.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {refreshTokenInterceptorProviders} from "./core/interceptors/refresh-token.interceptor";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayersModule,
    RouterModule,
    AuthModule,
    AdminModule,
    ClientModule,
    PhotographerModule,
    ManagerModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [authInterceptorProviders, refreshTokenInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
