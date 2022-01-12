import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {LocalStorageService} from "./local-storage.service";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {FingerPrintService} from "./finger-print.service";



@Injectable({
  providedIn: 'root'
})
export class AuthService{

  constructor(private http: HttpClient,
              private localStorageService: LocalStorageService,
              private router: Router,
              private cookieService: CookieService,
              private fingerPrintService: FingerPrintService)
  {

  }


  public login(username: string, password: string): Observable<any> {


    return this.http.post(environment.baseUrl + 'auth/login', {
      username: username,
      password: password,
      fingerPrint: this.fingerPrintService.getFingerPrint(),
    })
  }

  public refreshToken(): Observable<any> {



    return this.http.post(environment.baseUrl + 'auth/refresh_token', {
      userId: this.localStorageService.getUserIdFromAccessToken(),
      fingerPrint: this.fingerPrintService.getFingerPrint(),
    })
  }


  public logout(): void {
    this.http.post(environment.baseUrl + 'auth/logout', {
      userId: this.localStorageService.getUserIdFromAccessToken(),
      fingerPrint: this.fingerPrintService.getFingerPrint(),
    }).subscribe()
    this.localStorageService.clear();
  }

  isAuthenticated(): boolean {
    return !!this.localStorageService.getAccessToken();
  }

  deleteAllRefreshToken() {
    this.http.delete(environment.baseUrl + 'auth/delete_refresh_tokens').subscribe()
  }
}
