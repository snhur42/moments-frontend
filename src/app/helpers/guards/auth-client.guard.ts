import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {LocalStorageService} from '../service/local-storage.service';
import {Role} from '../../models/enum/role';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../service/authentication.service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthClientGuard implements CanActivate {

  constructor(private _localStorageService: LocalStorageService,
              private authenticationService: AuthenticationService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    if (this._localStorageService.isAuthenticated() &&
      this._localStorageService.getRole() === Role.CLIENT.toString()) {
      return true;
    } else {
      this.authenticationService.logout();
      this._localStorageService.clear()
      this.router.navigate(['']).then(r => {
        if (r) {
          window.location.reload()
        }
      })
      return false
    }

  }

}

