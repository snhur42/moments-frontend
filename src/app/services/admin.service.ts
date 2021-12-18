import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AdminModule} from "../pages/dashboards/admin/admin.module";
import {City} from "../models/user/city";
import {Role} from "../models/user/role";

const ADMIN_API = 'admin';

@Injectable({
  providedIn: 'root'
  // providedIn: AdminModule
})
export class AdminService {

  constructor(private http: HttpClient,
              private auth: AuthService) { }

  getAdminById(adminId: string): Observable<any> {
    return this.http.get(environment.baseUrl + ADMIN_API + '/admins/' + adminId);
  }


  createManager(firstName: string,
                lastName: string,
                phone: string,
                email: string,
                city: City,
                role: Role): Observable<any> {
    return this.http.post(environment.baseUrl + ADMIN_API + 'create_manager', {firstName, lastName, phone, email, city, role});
  }

  logout(userId: string) {
    console.log("logout2 ", userId)
    this.auth.logout(userId);
  }

}
