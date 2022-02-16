import {NgModule} from '@angular/core';

import {CheckboxModule} from 'app/layout/components/forms/form-elements/checkbox/checkbox.module';
import {DateTimePickerModule} from 'app/layout/components/forms/form-elements/date-time-picker/date-time-picker.module';
import {InputGroupsModule} from 'app/layout/components/forms/form-elements/input-groups/input-groups.module';
import {InputMaskModule} from 'app/layout/components/forms/form-elements/input-mask/input-mask.module';
import {InputModule} from 'app/layout/components/forms/form-elements/input/input.module';
import {NumberInputModule} from 'app/layout/components/forms/form-elements/number-input/number-input.module';
import {RadioModule} from 'app/layout/components/forms/form-elements/radio/radio.module';
import {SelectModule} from 'app/layout/components/forms/form-elements/select/select.module';
import {SwitchModule} from 'app/layout/components/forms/form-elements/switch/switch.module';
import {TextareaModule} from 'app/layout/components/forms/form-elements/textarea/textarea.module';
import {FileUploaderModule} from 'app/layout/components/forms/form-elements/file-uploader/file-uploader.module';
import {QuillEditorModule} from 'app/layout/components/forms/form-elements/quill-editor/quill-editor.module';
import {FlatpickrModule} from 'app/layout/components/forms/form-elements/flatpickr/flatpickr.module';

@NgModule({
  declarations: [],
  imports: [
    CheckboxModule,
    DateTimePickerModule,
    InputModule,
    InputGroupsModule,
    NumberInputModule,
    RadioModule,
    SelectModule,
    SwitchModule,
    TextareaModule,
    InputMaskModule,
    FileUploaderModule,
    QuillEditorModule,
    FlatpickrModule
  ]
})
export class FormElementsModule {
}
