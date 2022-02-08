import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JwtTokenStorage} from "../../services/jwt-token-storage.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  private refreshTokenInProgress = false;

  constructor(private jwtTokenStorage: JwtTokenStorage, private authService: AuthService, private router: Router) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (this.jwtTokenStorage.isExpired() && !this.refreshTokenInProgress) {

      this.refreshTokenInProgress = true

      request = request.clone({
        withCredentials: true
      });

      this.authService.refreshToken()
        .subscribe({
          next: data => {
            if (data.success) {
              this.jwtTokenStorage.saveToken(data.accessToken);
              this.refreshTokenInProgress = false
            }
          },
          error: err => {
            this.authService.logout(this.jwtTokenStorage.getUserId())
            this.jwtTokenStorage.clear()

            this.router.navigate(['']).then(r => {
              if (r) {
                window.location.reload()
              }
            })
          }
        })
    }

    return next.handle(request);
  }
}

export const refreshTokenInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true}
];
