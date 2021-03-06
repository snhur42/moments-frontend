import {Component, OnInit} from '@angular/core';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {CoreConfigService} from '@core/services/config.service';

@Component({
  selector: 'app-collapsed-menu',
  templateUrl: './collapsed-menu.component.html',
  styleUrls: ['./collapsed-menu.component.scss']
})
export class CollapsedMenuComponent implements OnInit {
  // public
  public contentHeader: object;
  public coreConfig: any;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   */
  constructor(private _coreConfigService: CoreConfigService) {
    this._unsubscribeAll = new Subject();

    // Configure the layout
    this._coreConfigService.config = {
      layout: {
        menu: {
          collapsed: true
        },
        customizer: true,
        enableLocalStorage: false
      }
    };
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    // Subscribe to config changes
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
    });

    this.contentHeader = {
      headerTitle: 'Layout collapsed menu',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          },
          {
            name: 'Layouts',
            isLink: true,
            link: '/'
          },
          {
            name: 'Collapsed Menu',
            isLink: false
          }
        ]
      }
    };
  }
}
