import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LocalStorageService} from "../../services/local-storage.service";
import {AuthService} from "../../services/auth.service";
import {CookieService} from "ngx-cookie-service";


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {



  constructor(private localStorageService: LocalStorageService,
              private cookies: CookieService,
              private authService: AuthService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isAuthenticated()) {
      if (this.localStorageService.getExpFromAccessToken() < new Date()) {
        this.authService.refreshToken().subscribe({
          next: data => {
            if(data.success) {
              this.localStorageService.saveAccessToken(data.accessToken)
            }
          },
          error: err => {
            console.log('refresh error ', err);
          }
        })
      }

      req = req.clone({
        setHeaders: {
          Bearer: this.localStorageService.getAccessToken()
          // Authorization: this.tokenStorageService.getToken()
        }
      })
    }

    return next.handle(req);
  }

}

export const authInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
];
