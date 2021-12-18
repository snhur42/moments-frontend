import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {User} from "../models/user/user";

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  public saveAccessToken(token: string): void {
    window.localStorage.removeItem(environment.tokenKey);
    window.localStorage.setItem(environment.tokenKey, token);
  }

  public getToken(): string {
    // @ts-ignore
    return localStorage.getItem(environment.tokenKey);
  }

  public saveUserId(userId: string): void {
    window.localStorage.removeItem(environment.userKey);
    window.localStorage.setItem(environment.userKey, JSON.stringify(userId));
  }

  public getUserId(): string {
    // @ts-ignore
    return JSON.parse(localStorage.getItem(environment.userKey));
  }

  logOut(): void {
    window.localStorage.clear();
  }
}
