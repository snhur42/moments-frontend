import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

const MANAGER_API = 'client';


@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  constructor(private http: HttpClient,
              private auth: AuthService) { }

  getManagerById(managerId: string): Observable<any> {
    return this.http.get(environment.baseUrl + MANAGER_API + '/managers/' + managerId);
  }

  logout() {
    this.auth.logout();
  }
}
