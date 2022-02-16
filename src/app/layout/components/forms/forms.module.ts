import {NgModule} from '@angular/core';

import {FormRepeaterModule} from 'app/layout/components/forms/form-repeater/form-repeater.module';
import {FormElementsModule} from 'app/layout/components/forms/form-elements/form-elements.module';
import {FormLayoutModule} from 'app/layout/components/forms/form-layout/form-layout.module';
import {FormValidationModule} from 'app/layout/components/forms/form-validation/form-validation.module';
import {FormWizardModule} from 'app/layout/components/forms/form-wizard/form-wizard.module';

@NgModule({
  declarations: [],
  imports: [FormElementsModule, FormLayoutModule, FormWizardModule, FormValidationModule, FormRepeaterModule]
})
export class FormsModule {
}
