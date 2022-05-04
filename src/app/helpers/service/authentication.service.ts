import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {environment} from 'environments/environment';
import {ToastrService} from 'ngx-toastr';
import {FingerPrintService} from './finger-print.service';
import {CookieService} from 'ngx-cookie-service';
import {LocalStorageService} from './local-storage.service';
import {Role} from '../../models/enum/role';

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

  createClient(firstName: string,
               lastName: string,
               email: string,
               phone: string,
               city: string,
               password: string,
               role: Role): Observable<boolean> {
    return this._httpClient.post<boolean>(environment.apiUrl + 'auth/create_client', {
      firstName,
      lastName,
      phone,
      password,
      email,
      city,
      role
    });
  }

  resetPassword( email: string): Observable<boolean> {
    return this._httpClient.post<boolean>(environment.apiUrl + 'auth/reset_password', {
      email
    });
  }
}
