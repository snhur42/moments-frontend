import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public saveAccessToken(token: string): void {
    window.localStorage.removeItem(environment.accessTokenKey);
    window.localStorage.setItem(environment.accessTokenKey, token);
  }

  public getAccessToken(): string {
    // @ts-ignore
    return localStorage.getItem(environment.accessTokenKey)
  }

  public getRoleFromAccessToken(): string {
      try{
        // @ts-ignore
        return jwt_decode(this.getAccessToken()).role;
      }
      catch(Error){
        console.error("RoleFromAccessTokenError")
        return "RoleFromAccessTokenError"
      }
    }

    public getUserIdFromAccessToken(): string {
      try{
        // @ts-ignore
        return jwt_decode(this.getAccessToken()).sub;
      }
      catch(Error){
        console.error("UserIdFromAccessToken")
        return "UserIdFromAccessToken"
      }
    }

    // @ts-ignore
  public getExpFromAccessToken(): Date {
      try{
        // @ts-ignore
        return new Date(jwt_decode(this.getAccessToken()).exp*1000);
      }
      catch(Error){
        console.error("ExpFromAccessToken")
      }
    }

  clear(): void {
    window.localStorage.clear();
  }
}
