import {Component, OnDestroy, OnInit} from '@angular/core';

import {Subject} from 'rxjs';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit, OnDestroy {
  // public
  public data: any;

  Monthly = false;

  // private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   */
  constructor() {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {

  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
