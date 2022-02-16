import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {LocalStorageService} from '../service/local-storage.service';
import {Role} from '../../models/enum/role';


@Injectable({providedIn: 'root'})
export class AuthPhotographerGuard implements CanActivate {
  /**
   *
   * @param {Router} _router
   * @param {LocalStorageService} _localStorageService
   */
  constructor(private _router: Router, private _localStorageService: LocalStorageService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentRole = this._localStorageService.getRole();

    if (currentRole == Role.PHOTOGRAPHER) {
      return true;
    }

    this._router.navigate(['/pages/authentication/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
