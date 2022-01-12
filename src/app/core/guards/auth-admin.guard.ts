import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../../services/auth.service";
import {LocalStorageService} from "../../services/local-storage.service";
import {Role} from "../../models/user/role";

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {

  constructor(private authService: AuthService,
              private localStorageService: LocalStorageService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    if (this.authService.isAuthenticated() && this.localStorageService.getRoleFromAccessToken() === Role.ADMIN.toString()){
      return true;
    } else {
      this.router.navigate(['']).then(r => {
        if (r) {
          window.location.reload()
        }
      })
      alert("You need to log in to access this page");
      return false
    }

  }

}
