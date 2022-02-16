import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from 'environments/environment';
import {LocalStorageService} from '../service/local-storage.service';
import {AuthenticationService} from '../service/authentication.service';

@Injectable()
export class AccessJwtInterceptor implements HttpInterceptor {


  /**
   *
   * @param {LocalStorageService} _localStorageService
   * @param {AuthenticationService} _authService
   */
  constructor(private _localStorageService: LocalStorageService, private _authService: AuthenticationService) {
  }

  /**
   * Add helpers header with jwt if user is logged in and request is to api url
   * @param request
   * @param next
   */

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (isApiUrl && this._localStorageService.isAuthenticated()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this._localStorageService.getToken()}`
        }
      });
    }

    return next.handle(request);
  }
}
