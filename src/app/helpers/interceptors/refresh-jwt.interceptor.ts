import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LocalStorageService} from '../service/local-storage.service';
import {AuthenticationService} from '../service/authentication.service';

@Injectable()
export class RefreshJwtInterceptor implements HttpInterceptor {
  private refreshTokenInProgress = false;


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

    if (this._localStorageService.isAuthenticated() && this._localStorageService.isExpired() && !this.refreshTokenInProgress) {
      this.refreshTokenInProgress = true;

      request = request.clone({
        withCredentials: true
      });

      this._authService.refreshToken()
        .subscribe({
          next: data => {
            if (data.success) {
              this._localStorageService.saveToken(data.accessToken);
              this.refreshTokenInProgress = false;
            }
          }
        });
    }

    return next.handle(request);
  }
}
