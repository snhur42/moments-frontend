import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import jwt_decode from 'jwt-decode';
import {Role} from '../../models/enum/role';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public saveToken(token: string): void {
    window.localStorage.removeItem(environment.tokenKey);
    window.localStorage.setItem(environment.tokenKey, token);
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
      if(this.isAuthenticated()){
        // @ts-ignore
        return jwt_decode(this.getToken()).sub;
      }else {
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

  clear(): void {
    window.localStorage.clear();
  }

  isAuthenticated(): boolean {
    return this.getToken() && !this.isExpired();
  }

}
