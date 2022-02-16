import {NgModule} from '@angular/core';

import {CardModule} from 'app/layout/components/ui/card/card.module';
import {ColorsModule} from 'app/layout/components/ui/colors/colors.module';
import {IconsModule} from 'app/layout/components/ui/icons/icons.module';
import {PageLayoutsModule} from 'app/layout/components/ui/page-layouts/page-layouts.module';
import {TypographyModule} from 'app/layout/components/ui/typography/typography.module';

@NgModule({
  imports: [ColorsModule, IconsModule, CardModule, TypographyModule, PageLayoutsModule]
})
export class UIModule {
}
