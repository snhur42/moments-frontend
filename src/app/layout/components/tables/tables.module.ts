import {NgModule} from '@angular/core';

import {TableModule} from 'app/layout/components/tables/table/table.module';
import {DatatablesModule} from 'app/layout/components/tables/datatables/datatables.module';

@NgModule({
  declarations: [],
  imports: [DatatablesModule, TableModule]
})
export class TablesModule {
}
