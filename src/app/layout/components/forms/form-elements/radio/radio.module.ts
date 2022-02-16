import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {CardSnippetModule} from '@core/components/card-snippet/card-snippet.module';
import {ContentHeaderModule} from 'app/layout/components/content-header/content-header.module';

import {RadioComponent} from 'app/layout/components/forms/form-elements/radio/radio.component';

const routes: Routes = [
  {
    path: 'form-elements/radio',
    component: RadioComponent,
    data: {animation: 'radio'}
  }
];

@NgModule({
  declarations: [RadioComponent],
  imports: [CommonModule, RouterModule.forChild(routes), NgbModule, ContentHeaderModule, CardSnippetModule, FormsModule]
})
export class RadioModule {
}
