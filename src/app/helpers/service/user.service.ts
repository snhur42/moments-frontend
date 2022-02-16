import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {User} from '../../models/user/user';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {LocalStorageService} from './local-storage.service';


@Injectable({providedIn: 'root'})
export class UserService {
  private readonly userId: string

  /**
   *
   * @param {HttpClient} _httpClient
   * @param _localStorageService
   */
  constructor(private _httpClient: HttpClient, private _localStorageService: LocalStorageService) {
    this.userId = _localStorageService.getUserId()
  }

  /**
   * Get user by id
   */
  getUserById(): Observable<User> {
    return this._httpClient.get<User>(environment.apiUrl + 'auth/get_user/' + this.userId);
  }


}

