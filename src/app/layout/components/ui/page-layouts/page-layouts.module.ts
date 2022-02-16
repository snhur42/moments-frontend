import {NgModule} from '@angular/core';

import {BoxedLayoutModule} from 'app/layout/components/ui/page-layouts/boxed-layout/boxed-layout.module';
import {WithoutMenuModule} from 'app/layout/components/ui/page-layouts/without-menu/without-menu.module';
import {LayoutEmptyModule} from 'app/layout/components/ui/page-layouts/layout-empty/layout-empty.module';
import {LayoutBlankModule} from 'app/layout/components/ui/page-layouts/layout-blank/layout-blank.module';
import {CollapsedMenuModule} from 'app/layout/components/ui/page-layouts/collapsed-menu/collapsed-menu.module';

@NgModule({
  imports: [BoxedLayoutModule, CollapsedMenuModule, LayoutBlankModule, LayoutEmptyModule, WithoutMenuModule],
  declarations: []
})
export class PageLayoutsModule {
}
