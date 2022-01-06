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

  public saveUserId(userId: string): void {
    window.localStorage.removeItem(environment.userKey);
    window.localStorage.setItem(environment.userKey, JSON.stringify(userId));
  }

  public saveExpiredDate(expiredDate: string): void {
    window.localStorage.removeItem(environment.expiredDate);
    window.localStorage.setItem(environment.expiredDate, expiredDate);
  }

  public saveRole(role: string): void {
    window.localStorage.removeItem(environment.role);
    window.localStorage.setItem(environment.role, role);
  }

  public saveFingerPrint(fingerPrint: string): void {
    window.localStorage.removeItem(environment.fingerPrint);
    window.localStorage.setItem(environment.fingerPrint, fingerPrint);
  }

  public getToken(): string {
    // @ts-ignore
    return localStorage.getItem(environment.tokenKey);
  }

  public getRole(): string {
    // @ts-ignore
    return localStorage.getItem(environment.role);
  }

  public getExpiredDate(): string {
    // @ts-ignore
    return localStorage.getItem(environment.expiredDate);
  }

  public getUserId(): string {
    // @ts-ignore
    return JSON.parse(localStorage.getItem(environment.userKey));
  }

  public getFingerPrint(): string {
    // @ts-ignore
    return  localStorage.getItem(environment.fingerPrint);
  }

  logOut(): void {
    window.localStorage.clear();
  }
}
