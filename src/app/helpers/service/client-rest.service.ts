import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {User} from '../../models/user/user';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {LocalStorageService} from './local-storage.service';


@Injectable({providedIn: 'root'})
export class ClientRestService {

  /**
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient) {
  }

  /**
   * Get user by id
   */
  getUserById(userId: string): Observable<User> {
    return this._httpClient.get<User>(environment.apiUrl + 'auth/get_user/' + userId);
  }


}

