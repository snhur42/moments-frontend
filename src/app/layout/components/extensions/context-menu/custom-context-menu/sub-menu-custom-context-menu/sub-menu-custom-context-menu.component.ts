import {Component, ViewEncapsulation} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

import {cloneDeep} from 'lodash';
import {GlobalConfig, ToastrService} from 'ngx-toastr';
import {ContextMenuService, MenuComponent, MenuPackage} from '@ctrl/ngx-rightclick';

import {CustomToastrComponent} from 'app/layout/components/extensions/toastr/custom-toastr/custom-toastr.component';
import {
  SubSubMenuCustomContextMenuComponent
} from 'app/layout/components/extensions/context-menu/custom-context-menu/sub-menu-custom-context-menu/sub-sub-menu-custom-context-menu/sub-sub-menu-custom-context-menu.component';

@Component({
  selector: 'app-sub-menu-custom-context-menu',
  templateUrl: './sub-menu-custom-context-menu.component.html',
  styleUrls: ['../../context-menu.component.scss'],
  animations: [
    trigger('menu', [
      state('enter', style({opacity: 1})),
      state('exit, void', style({opacity: 0})),
      transition('* => *', animate(0))
    ])
  ],
  encapsulation: ViewEncapsulation.None
})
export class SubMenuCustomContextMenuComponent extends MenuComponent {
  public subMenu = SubSubMenuCustomContextMenuComponent;
  // private
  private options: GlobalConfig;

  /**
   * Constructor
   *
   * @param {ToastrService} toastr
   * @param {MenuPackage} menuPackage
   * @param {ContextMenuService} contextMenuService
   */
  constructor(
    public menuPackage: MenuPackage,
    public contextMenuService: ContextMenuService,
    private toastr: ToastrService
  ) {
    super(menuPackage, contextMenuService);
    this.options = this.toastr.toastrConfig;
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------
  handleClick(msg: string) {
    const customToastrRef = cloneDeep(this.options);
    customToastrRef.toastComponent = CustomToastrComponent;
    customToastrRef.closeButton = true;
    customToastrRef.tapToDismiss = false;
    customToastrRef.toastClass = 'toast ngx-toastr';
    this.toastr.success('', msg, customToastrRef);
    this.contextMenuService.closeAll();
  }
}
