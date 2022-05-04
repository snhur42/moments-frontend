import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {ContentHeaderModule} from 'app/layout/components/content-header/content-header.module';

import {CollapsedMenuComponent} from 'app/layout/components/ui/page-layouts/collapsed-menu/collapsed-menu.component';
import {PagesService} from '../../../../../pages/pages.service';
import {PagesModule} from '../../../../../pages/pages.module';

// ! ALERT: This layout do not works with Horizontal Menu

const routes: Routes = [
  {
    path: 'page-layouts/collapsed-menu',
    component: CollapsedMenuComponent,
    resolve: {
      css: PagesService
    }
  }
];

@NgModule({
  declarations: [CollapsedMenuComponent],
  imports: [RouterModule.forChild(routes), NgbModule, ContentHeaderModule, PagesModule],
  providers: [PagesService]
})
export class CollapsedMenuModule {
}
