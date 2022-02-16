import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AuthGuard} from 'app/helpers/helpers';
import {CoreCommonModule} from '@core/common.module';
import {ContentHeaderModule} from 'app/layout/components/content-header/content-header.module';
import {FaqComponent} from './faq.component';
import {FAQService} from './faq.service';


const routes: Routes = [
  {
    path: 'faq',
    component: FaqComponent,
    canActivate: [AuthGuard],
    resolve: {
      faqData: FAQService
    },
    data: {animation: 'faq'}
  }
];

@NgModule({
  declarations: [FaqComponent],
  imports: [CommonModule, RouterModule.forChild(routes), NgbModule, CoreCommonModule, ContentHeaderModule],

  providers: [FAQService]
})
export class FaqModule {
}
