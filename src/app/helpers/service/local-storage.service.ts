import {Injectable, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import jwt_decode from 'jwt-decode';
import {Role} from '../../models/enum/role';
import {UserRestService} from './user-rest.service';
import {User} from '../../models/user/user';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService{

  constructor(private userService: UserRestService) {
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(environment.tokenKey);
    window.localStorage.setItem(environment.tokenKey, token);

  }

  public saveUser(user: User): void {
    window.localStorage.removeItem(environment.userKey);
    window.localStorage.setItem(environment.userKey, JSON.stringify(user));

  }

  public getUser(): User {
    // @ts-ignore
    return JSON.parse(localStorage.getItem(environment.userKey));

  }

  public getToken(): string {
    // @ts-ignore
    return localStorage.getItem(environment.tokenKey);
  }

  public getRole(): Role {
    try {
      // @ts-ignore
      return jwt_decode(this.getToken()).role;
    } catch (Error) {
      console.error('RoleFromAccessTokenError');
    }
  }

  public getUserId(): string {
    try {
      if (this.isAuthenticated()) {
        // @ts-ignore
        return jwt_decode(this.getToken()).sub;
      } else {
        return;
      }
    } catch (Error) {
      console.error('UserIdFromAccessToken');
      return 'UserIdFromAccessToken';
    }
  }

  // @ts-ignore
  public isExpired(): boolean {
    try {
      // @ts-ignore
      return new Date(jwt_decode(this.getToken()).exp * 1000 - 5000) < new Date();
    } catch (Error) {
    }
  }


  isAuthenticated(): boolean {
    return this.getToken() && !this.isExpired() && this.getUser() != null;
  }

  clear(): void {
    window.localStorage.clear();
  }

}
