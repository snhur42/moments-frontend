import {Component} from '@angular/core';

import {Toast, ToastPackage, ToastrService} from 'ngx-toastr';

import {toastrSlideY} from 'app/layout/components/extensions/toastr/custom-toastr/custom-toastr.animation';

@Component({
  selector: '[app-custom-toastr-component]',
  templateUrl: './custom-toastr.component.html',
  animations: [toastrSlideY],
  preserveWhitespaces: false
})
export class CustomToastrComponent extends Toast {
  constructor(protected toastrService: ToastrService, public toastPackage: ToastPackage) {
    super(toastrService, toastPackage);
  }
}
