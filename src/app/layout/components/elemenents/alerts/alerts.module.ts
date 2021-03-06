import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {CoreCommonModule} from '@core/common.module';
import {CardSnippetModule} from '@core/components/card-snippet/card-snippet.module';
import {ContentHeaderModule} from 'app/layout/components/content-header/content-header.module';

import {AlertsComponent} from 'app/layout/components/elemenents/alerts/alerts.component';

const routes: Routes = [
  {
    path: 'alerts',
    component: AlertsComponent,
    data: {animation: 'alerts'}
  }
];

@NgModule({
  declarations: [AlertsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    CoreCommonModule,
    ContentHeaderModule,
    CardSnippetModule,
    FormsModule
  ]
})
export class AlertsModule {
}
