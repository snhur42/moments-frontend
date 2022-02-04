import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {City} from "../models/user/city";
import {Role} from "../models/user/role";

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

  createClient(firstName: string,
                     lastName: string,
                     email: string,
                     phone: string,
                     password: string,
                     city: City,
                     role: Role): Observable<any> {
    return this.http.post(environment.baseUrl + 'auth/create_client', {firstName, lastName, phone, password, email, city, role});
  }


}
