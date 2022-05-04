import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {ContentHeaderModule} from 'app/layout/components/content-header/content-header.module';
import {BoxedLayoutComponent} from 'app/layout/components/ui/page-layouts/boxed-layout/boxed-layout.component';

const routes: Routes = [
  {
    path: 'page-layouts/boxed-layout',
    component: BoxedLayoutComponent,
    // resolve: {
    //   css: PagesService
    // }
  }
];

@NgModule({
  declarations: [BoxedLayoutComponent],
  imports: [RouterModule.forChild(routes), NgbModule, ContentHeaderModule],
})
export class BoxedLayoutModule {
}
