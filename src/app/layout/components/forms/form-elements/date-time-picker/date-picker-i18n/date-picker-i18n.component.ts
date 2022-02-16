import {Component, OnInit} from '@angular/core';

import {NgbDatepickerI18n, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

import {
  CustomDatepickerI18n,
  I18n
} from 'app/layout/components/forms/form-elements/date-time-picker/date-picker-i18n/date-picker-i18n.service';

@Component({
  selector: 'date-picker-i18n',
  templateUrl: './date-picker-i18n.component.html',
  providers: [I18n, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}] // define custom NgbDatepickerI18n provider
})
export class DatePickerI18nComponent implements OnInit {
  public i18nDPdata: NgbDateStruct;

  constructor() {
  }

  ngOnInit() {
  }
}
