import {Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Role} from "../models/enum/role";
import {CookieService} from "ngx-cookie-service";
import {CurrentBriefQuestions} from "../models/photo_session/current_brief_questions";
import {City} from "../models/enum/city";

const ADMIN_API = 'admin/';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient,
              private cookieService: CookieService,
              private authService: AuthService) {
  }

  getAdminById(adminId: string): Observable<any> {
    return this.http.get(environment.baseUrl + ADMIN_API + 'admins/' + adminId);
  }

  createAdmin(firstName: string,
              lastName: string,
              phone: string,
              email: string,
              city: City,
              role: Role): Observable<any> {
    return this.http.post(environment.baseUrl + ADMIN_API + 'create_admin', {
      firstName,
      lastName,
      phone,
      email,
      city,
      role
    });
  }


  createManager(firstName: string,
                lastName: string,
                email: string,
                phone: string,
                password: string,
                city: City,
                role: Role): Observable<any> {
    return this.http.post(environment.baseUrl + ADMIN_API + 'create_manager', {
      firstName,
      lastName,
      email,
      phone,
      password,
      city,
      role
    });
  }

  createPhotographer(firstName: string,
                     lastName: string,
                     email: string,
                     phone: string,
                     city: City,
                     role: Role): Observable<any> {
    return this.http.post(environment.baseUrl + ADMIN_API + 'create_photographer', {
      firstName,
      lastName,
      email,
      phone,
      city,
      role
    });
  }

  getAllManagers(): Observable<any> {
    return this.http.get(environment.baseUrl + ADMIN_API + 'managers');
  }

  blockManager(managerId: string): void {
    this.http.put(environment.baseUrl + ADMIN_API + `block_manager/${managerId}`, null).subscribe();
  }


  blockPhotographer(photographerId: string): void {
    this.http.put(environment.baseUrl + ADMIN_API + `block_photographer/${photographerId}`, null).subscribe();
  }

  updateAdmin(userId: string, firstName: string, lastName: string, phone: string, email: string, role: Role, city: City): Observable<any> {
    return this.http.put(environment.baseUrl + ADMIN_API + `update_admin/${userId}`, {
      firstName,
      lastName,
      phone,
      email,
      city,
      role,
    });
  }

  updateManager(userId: string, firstName: string, lastName: string, phone: string, email: string, role: Role, city: City): Observable<any> {
    return this.http.put(environment.baseUrl + ADMIN_API + `update_manager/${userId}`, {
      firstName,
      lastName,
      phone,
      email,
      city,
      role,
    });
  }

  updatePhotographer(userId: string, firstName: string, lastName: string, phone: string, email: string, role: Role, city: City): Observable<any> {
    return this.http.put(environment.baseUrl + ADMIN_API + `update_photographer/${userId}`, {
      firstName,
      lastName,
      phone,
      email,
      city,
      role,
    });
  }

  getAllPhotographers(): Observable<any> {
    return this.http.get(environment.baseUrl + ADMIN_API + 'photographers');
  }

  getAllClients(): Observable<any> {
    return this.http.get(environment.baseUrl + ADMIN_API + 'clients');

  }

  logout(userId: string): void {
    this.authService.logout(userId);
  }

  getBriefQuestion(): Observable<any>  {
    return this.http.get(environment.baseUrl + ADMIN_API + 'get_brief_questions');
  }

  updateBriefQuestion(currentBriefQuestions: CurrentBriefQuestions): Observable<any>  {
    let questions = JSON.stringify(currentBriefQuestions.questions)
    return this.http.put(environment.baseUrl + ADMIN_API + 'update_brief_questions', {questions});
  }
}
