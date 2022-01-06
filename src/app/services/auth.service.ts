import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {TokenStorageService} from "./token-storage.service";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {dashCaseToCamelCase} from "@angular/compiler/src/util";
import FingerprintJS from "@fingerprintjs/fingerprintjs-pro";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private tokenStorage: TokenStorageService,
              private router: Router,
              private cookies: CookieService)
  {

  }

  public login(username: string, password: string, fingerPrint: string): Observable<any> {
    return this.http.post(environment.baseUrl + 'auth/login', {
      username: username,
      password: password,
      fingerPrint: fingerPrint,
    })
  }

  public refreshToken(): Observable<any> {
    return this.http.post(environment.baseUrl + 'auth/refresh_token', {
      userId: this.tokenStorage.getUserId(),
      refreshTokenId: this.cookies.get("refreshToken"),
      fingerPrint: this.tokenStorage.getFingerPrint()
    })
  }


  public logout(userId: string): void {
    this.tokenStorage.logOut();
  }


  isAuthenticated(): boolean {
    return !!this.tokenStorage.getUserId();
  }
}
