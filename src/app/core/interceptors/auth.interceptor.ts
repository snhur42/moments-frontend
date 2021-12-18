import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorageService} from "../../services/token-storage.service";

const TOKEN_HEADER_KEY = 'Bearer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private tokenStorageService: TokenStorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authRequest = req;
    const token = this.tokenStorageService.getToken();
    if(authRequest.url.startsWith('http://localhost:8080/api/auth/')){
      return next.handle(authRequest);
    }else if(token != null){
      authRequest = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, token)});
      return next.handle(authRequest);
    }else {
      return next.handle(authRequest);
    }
  }
}

export const authInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
];
