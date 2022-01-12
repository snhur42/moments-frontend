import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

const CLIENT_API = 'client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private http: HttpClient,
              private auth: AuthService) { }

  getClientById(clientId: string): Observable<any> {
    return this.http.get(environment.baseUrl + CLIENT_API + '/client/' + clientId);
  }

  logout() {
    this.auth.logout();
  }

}
