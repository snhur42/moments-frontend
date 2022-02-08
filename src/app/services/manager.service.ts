import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Certificate} from "../models/photo_session/certificate";
import {PhotoSession} from "../models/photo_session/photo-session";

const MANAGER_API = 'manager';


@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  getManagerById(managerId: string): Observable<any> {
    return this.http.get(environment.baseUrl + MANAGER_API + '/managers/' + managerId);
  }

  logout(userId: string): void {
    this.authService.logout(userId);
  }

  getCertificates(): Observable<Certificate[]>  {
      return this.http.get<Certificate[]>(environment.baseUrl + MANAGER_API + '/get_all_certificates');
    }

  addNewCertificate() {
    return this.http.post(environment.baseUrl + MANAGER_API + '/add_certificate', {});
  }

  deleteCertificate(certificateId: string) {
    return this.http.delete(environment.baseUrl + MANAGER_API + `/delete_certificate/${certificateId}`);
  }

  uploadPhotoSession(): Observable<PhotoSession[]> {
    return this.http.get<PhotoSession[]>(environment.baseUrl + MANAGER_API + '/photo_sessions');
  }
}
