import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../../services/auth.service";
import {JwtTokenStorage} from "../../services/jwt-token-storage.service";
import {Role} from "../../models/user/role";

@Injectable({
  providedIn: 'root'
})
export class AuthClientGuard implements CanActivate {
  constructor(private authService: AuthService,
              private jwtTokenStorage: JwtTokenStorage) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authService.isAuthenticated() && this.jwtTokenStorage.getRole() === Role.CLIENT.toString()){
      return true;
    } else {
      return false
    }

  }

}
