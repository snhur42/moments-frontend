import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// ng bootstrap
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HIGHLIGHT_OPTIONS, HighlightModule} from 'ngx-highlightjs';

// core modules
import {CoreCommonModule} from '@core/common.module';
import {CardSnippetModule} from '@core/components/card-snippet/card-snippet.module';
import {ContentHeaderModule} from 'app/layout/components/content-header/content-header.module';

import {TypographyComponent} from 'app/layout/components/ui/typography/typography.component';

// routing
const routes: Routes = [
  {
    path: 'content/typography',
    component: TypographyComponent,
    data: {animation: 'typography'}
  }
];

@NgModule({
  declarations: [TypographyComponent],
  imports: [
    RouterModule.forChild(routes),
    CoreCommonModule,
    HighlightModule,
    NgbModule,
    CardSnippetModule,
    ContentHeaderModule
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        fullLibraryLoader: () => import('highlight.js')
      }
    }
  ]
})
export class TypographyModule {
}
