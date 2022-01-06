import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorageService} from "../../services/token-storage.service";
import {environment} from "../../../environments/environment";
import {AuthService} from "../../services/auth.service";
import FingerprintJS from "@fingerprintjs/fingerprintjs-pro";

const TOKEN_HEADER_KEY = 'Bearer';


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {



  constructor(private tokenStorageService: TokenStorageService,
              private authService: AuthService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(this.authService.isAuthenticated()){

      let expiredDate = new Date(this.tokenStorageService.getExpiredDate());
      if (expiredDate < new Date()) {
        this.authService.refreshToken().subscribe({
          next: data => {
            this.tokenStorageService.saveAccessToken(data.accessToken);
            this.tokenStorageService.saveUserId(data.userId);
            this.tokenStorageService.saveExpiredDate(data.expiredDate);
          },
          error: err =>  {
            console.log('refresh error ', err);
          }
        })
      }

      req = req.clone({
        setHeaders:{
          Bearer: this.tokenStorageService.getToken()
          // Authorization: this.tokenStorageService.getToken()
        }
      })
    }

    return next.handle(req);

    //
    // let authRequest = req;
    // const token = this.tokenStorageService.getToken();
    // if(authRequest.url.startsWith(environment.baseUrl + 'auth/login')){
    //   console.log("login")
    //   return next.handle(authRequest);
    // }else if(authRequest.url.startsWith(environment.baseUrl + 'auth/logout')){
    //   console.log("logout")
    //   authRequest = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, token)});
    //   return next.handle(authRequest);
    // }else if(token != null){
    //   console.log("token")
    //   authRequest = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, token)});
    //   return next.handle(authRequest);
    // } else {
    //   return next.handle(authRequest);
    // }
  }
}

export const authInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
];
