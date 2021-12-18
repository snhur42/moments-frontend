import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {TokenStorageService} from "./token-storage.service";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient,
              private tokenStorage: TokenStorageService,
              private router: Router,
              private cookies: CookieService,)
  { }

  public login(username: string, password: string, fingerPrint: string): Observable<any> {
    return this.http.post(environment.baseUrl + 'auth/login', {
      username: username,
      password: password,
      fingerPrint: fingerPrint,
    });
  }

  public logout(userId: string): void {
    console.log("logout3 ", userId)
    this.http.post(environment.baseUrl + `auth/logout/${userId}`, userId);
    console.log("logout4 ", userId)

    this.tokenStorage.logOut();
    console.log("logout5 ", userId)

    this.cookies.delete('refreshToken');
    console.log("logout6 ", userId)

    this.router.navigate(['']);
  }


}
