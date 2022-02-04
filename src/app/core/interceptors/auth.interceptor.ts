import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {JwtTokenStorage} from "../../services/jwt-token-storage.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private jwtTokenStorage: JwtTokenStorage,
              private router: Router,
              private authService: AuthService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(this.authService.isAuthenticated()) {
      req = req.clone({
        setHeaders: {
          Authorization: environment.headerPrefix + " " + this.jwtTokenStorage.getToken()
        }})
    } else {
        this.router.navigate(['']).then(r => {
          if (r) {
            window.location.reload()
          }
        })
    }
      return next.handle(req);
  }
}


export const authInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
];
