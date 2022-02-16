import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CoreCommonModule} from '@core/common.module';
import {ComingSoonComponent} from './coming-soon/coming-soon.component';
import {NotAuthorizedComponent} from './not-authorized/not-authorized.component';
import {MaintenanceComponent} from './maintenance/maintenance.component';
import {ErrorComponent} from './error/error.component';

const routes: Routes = [
  {
    path: '',
    component: ErrorComponent
  }
];

@NgModule({
  declarations: [ComingSoonComponent, NotAuthorizedComponent, MaintenanceComponent, ErrorComponent],
  imports: [CommonModule, RouterModule.forChild(routes), CoreCommonModule]
})
export class Error {
}
