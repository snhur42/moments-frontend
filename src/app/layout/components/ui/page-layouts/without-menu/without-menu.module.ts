import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {ContentHeaderModule} from 'app/layout/components/content-header/content-header.module';

import {WithoutMenuComponent} from 'app/layout/components/ui/page-layouts/without-menu/without-menu.component';
import {PagesModule} from '../../../../../pages/pages.module';
import {PagesService} from '../../../../../pages/pages.service';

const routes: Routes = [
  {
    path: 'page-layouts/without-menu',
    component: WithoutMenuComponent,
    resolve: {
      css: PagesService
    }
  }
];

@NgModule({
  declarations: [WithoutMenuComponent],
  imports: [RouterModule.forChild(routes), NgbModule, ContentHeaderModule, PagesModule],
  providers: [PagesModule]
})
export class WithoutMenuModule {
}
