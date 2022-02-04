import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

const PHOTOGRAPHER_API = 'photographer';

@Injectable({
  providedIn: 'root'
})
export class PhotographerService {
  constructor(private http: HttpClient,
              private auth: AuthService) { }

  getPhotographerById(photographerId: string): Observable<any> {
    return this.http.get(environment.baseUrl + PHOTOGRAPHER_API + '/photographers/' + photographerId);
  }


}
