import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {environment} from 'environments/environment';
import {ToastrService} from 'ngx-toastr';
import {FingerPrintService} from './finger-print.service';
import {CookieService} from 'ngx-cookie-service';
import {User} from '../../models/user/user';
import {LocalStorageService} from './local-storage.service';

@Injectable({providedIn: 'root'})
export class AuthenticationService {

  /**
   *
   * @param {HttpClient} _httpClient
   * @param {ToastrService} _toastrService
   * @param {FingerPrintService} _fingerPrintService
   * @param {LocalStorageService} _localStorageStorage
   * @param {CookieService} _cookies
   */
  constructor(private _httpClient: HttpClient,
              private _toastrService: ToastrService,
              private _fingerPrintService: FingerPrintService,
              private _cookies: CookieService,
              private _localStorageStorage: LocalStorageService
  ) {
  }

  /**
   * User login
   *
   * @param email
   * @param password
   * @returns user
   */
  login(email: string, password: string): Observable<any> {
    return this._httpClient
      .post(environment.apiUrl + 'auth/login', {
        email: email,
        password: password,
        fingerPrint: this._fingerPrintService.getFingerPrint()
      }, {
        withCredentials: true
      });
  }

  /**
   * User logout
   *
   */
  public logout(): void {
    this._httpClient.post(environment.apiUrl + 'auth/logout', {
      userId: this._localStorageStorage.getUserId(),
      fingerPrint: this._fingerPrintService.getFingerPrint()
    }).subscribe();
    this._localStorageStorage.clear();
    this._cookies.deleteAll();
  }

  public refreshToken(): Observable<any> {
    return this._httpClient.post(environment.apiUrl + 'auth/refresh_token', {}, {withCredentials: true});
  }

}
