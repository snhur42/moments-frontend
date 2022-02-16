import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {LayoutBlankComponent} from 'app/layout/components/ui/page-layouts/layout-blank/layout-blank.component';

// routing
const routes: Routes = [
  {
    path: 'page-layouts/layout-blank',
    component: LayoutBlankComponent
  }
];

@NgModule({
  declarations: [LayoutBlankComponent],
  imports: [RouterModule.forChild(routes), NgbModule]
})
export class LayoutBlankModule {
}
