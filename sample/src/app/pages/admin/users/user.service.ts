import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import * as Constants from '../../../app.const';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  onPageChanged: Subject<any>;
  onUsersChanged: BehaviorSubject<any>;
  private totalCountsubject = new Subject<any>();

  users: User[];
  userTotalCount: number;
  pageNo = 0;
  numPerPage = 10;


  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService,
    private authService: AuthService,
  ) {

  }

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this.tokenService.getToken(),
    })
  };

  /**
    * Get users
    *
    * @returns {Promise<any>}
    */

  getUsers(pageNo, numPerPage): Observable<any> {
    let params = new HttpParams();
    params = params.set('pageNo', pageNo);
    params = params.set('numPerPage', numPerPage);

    return this.httpClient.get(Constants.API_URL + 'api/users/get', { params: params, headers: this.jwt() })
      .pipe(
        map((response: any) => response)
      )
  }

  getUser(userID): Observable<any> {
    let params = new HttpParams;
    params = params.set('userID', userID);
    return this.httpClient.get(Constants.API_URL + 'api/users/getUser', { params: params, headers: this.jwt() })
      .pipe(
        map((response: any) => response)
      );
  }

  /**
     * Create User
     *
     * @param user
     * @returns {Promise<any>}
     */
  saveUser(user): Observable<any> {
    return this.httpClient.post(Constants.API_URL + 'api/users/saveUser', { ...user }, { headers: this.jwt() })
      .pipe(
        map((response: any) => response)
      )
  }

  deleteUser(userId): Observable<any> {
    let params = new HttpParams();
    params = params.set('userId', userId)
    return this.httpClient.get(Constants.API_URL + 'api/users/delete', { params: params, headers: this.jwt() })
      .pipe(
        map((response: any) => response)
      )
  }

  private jwt(): any {
    const tokenStr = this.tokenService.getToken();
    if (tokenStr) {
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + tokenStr);
      return headers;
    } else {
      return '';
    }
  }
}
