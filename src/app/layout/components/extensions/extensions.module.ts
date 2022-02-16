import {NgModule} from '@angular/core';

import {BlockuiModule} from 'app/layout/components/extensions/blockui/blockui.module';
import {ClipboardModule} from 'app/layout/components/extensions/clipboard/clipboard.module';
import {ContextMenusModule} from 'app/layout/components/extensions/context-menu/context-menu.module';
import {DragDropModule} from 'app/layout/components/extensions/drag-drop/drag-drop.module';
import {MediaPlayerModule} from 'app/layout/components/extensions/media-player/media-player.module';
import {NouiSliderModule} from 'app/layout/components/extensions/noui-slider/noui-slider.module';
import {SweetAlertsModule} from 'app/layout/components/extensions/sweet-alerts/sweet-alerts.module';
import {SwipersModule} from 'app/layout/components/extensions/swiper/swiper.module';
import {ToastrsModule} from 'app/layout/components/extensions/toastr/toastr.module';
import {TourModule} from 'app/layout/components/extensions/tour/tour.module';
import {TreeViewModule} from 'app/layout/components/extensions/tree-view/tree-view.module';

@NgModule({
  declarations: [],
  imports: [
    TreeViewModule,
    TourModule,
    ClipboardModule,
    SweetAlertsModule,
    NouiSliderModule,
    SwipersModule,
    MediaPlayerModule,
    DragDropModule,
    ToastrsModule,
    ContextMenusModule,
    BlockuiModule
  ]
})
export class ExtensionsModule {
}
