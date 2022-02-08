import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {JwtTokenStorage} from "./jwt-token-storage.service";
import {CookieService} from "ngx-cookie-service";
import {FingerPrintService} from "./finger-print.service";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private cookies: CookieService,
              private fingerPrintService: FingerPrintService,
              private jwtTokenStorage: JwtTokenStorage) {

  }


  public login(email: string, password: string, fingerPrint: string): Observable<any> {
    return this.http.post(environment.baseUrl + 'auth/login', {
      email: email,
      password: password,
      fingerPrint: fingerPrint,
    }, {
      withCredentials: true
    })
  }

  public logout(userId: string): void {
    this.http.post(environment.baseUrl + 'auth/logout', {
      userId: userId,
      fingerPrint: this.fingerPrintService.getFingerPrint()
    }).subscribe()
    this.jwtTokenStorage.clear();
    this.cookies.deleteAll();
  }

  public refreshToken(): Observable<any> {
    return this.http.post(environment.baseUrl + 'auth/refresh_token', {}, {withCredentials: true})
  }

  isAuthenticated(): boolean {
    return !!this.jwtTokenStorage.getToken()
  }

}
