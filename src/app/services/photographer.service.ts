import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

const PHOTOGRAPHER_API = 'photographer';

@Injectable({
  providedIn: 'root'
})
export class PhotographerService {
  constructor(private httpClient: HttpClient) {
  }

  getPhotographerById(photographerId: string): Observable<any> {
    return this.httpClient.get(environment.baseUrl + PHOTOGRAPHER_API + '/photographers/' + photographerId);
  }

  uploadImages(data: FileList): Observable<HttpEvent<{}>> {
    const formData = new FormData();
    Array.from(data).forEach(file => {
      formData.append('data', file);
    });
    const request = new HttpRequest('POST', `${environment.baseUrl}${PHOTOGRAPHER_API}/upload_photos`, formData, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.httpClient.request(request);
  }


  getPhotos(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + PHOTOGRAPHER_API + '/get_photos');
  }

  getProfileImage(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + PHOTOGRAPHER_API + '/get_photos');
  }
}
