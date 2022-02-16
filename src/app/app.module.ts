import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import 'hammerjs';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ToastrModule} from 'ngx-toastr';
import {TranslateModule} from '@ngx-translate/core';
import {ContextMenuModule} from '@ctrl/ngx-rightclick';

import {CoreModule} from '@core/core.module';
import {CoreCommonModule} from '@core/common.module';
import {CoreSidebarModule} from '@core/components';
import {CardSnippetModule} from '@core/components/card-snippet/card-snippet.module';

import {coreConfig} from 'app/app-config';

import {AppComponent} from 'app/app.component';
import {LayoutModule} from 'app/layout/layout.module';
import {ContentHeaderModule} from 'app/layout/components/content-header/content-header.module';

import {ContextMenuComponent} from 'app/layout/components/extensions/context-menu/context-menu.component';
import {
  AnimatedCustomContextMenuComponent
} from './layout/components/extensions/context-menu/custom-context-menu/animated-custom-context-menu/animated-custom-context-menu.component';
import {
  BasicCustomContextMenuComponent
} from './layout/components/extensions/context-menu/custom-context-menu/basic-custom-context-menu/basic-custom-context-menu.component';
import {
  SubMenuCustomContextMenuComponent
} from './layout/components/extensions/context-menu/custom-context-menu/sub-menu-custom-context-menu/sub-menu-custom-context-menu.component';
import {AppRoutingModule} from './app-routing.service';
import {AccessJwtInterceptor} from './helpers/interceptors/access-jwt.interceptor';
import {RefreshJwtInterceptor} from './helpers/interceptors/refresh-jwt.interceptor';
import {ErrorInterceptor} from './helpers/interceptors/error.interceptor';
import {AuthenticationModule} from './main/pages/authentication/authentication.module';

@NgModule({
  declarations: [
    AppComponent,
    ContextMenuComponent,
    BasicCustomContextMenuComponent,
    AnimatedCustomContextMenuComponent,
    SubMenuCustomContextMenuComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot(),
    ContextMenuModule,
    CoreModule.forRoot(coreConfig),
    CoreCommonModule,
    CoreSidebarModule,
    CardSnippetModule,
    LayoutModule,
    ContentHeaderModule
  ],

  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AccessJwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: RefreshJwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  entryComponents: [BasicCustomContextMenuComponent, AnimatedCustomContextMenuComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
