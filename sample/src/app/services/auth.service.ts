import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
import * as Constants from '../app.const';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(this.token.loggedIn());

  public authStatus = this.loggedIn.asObservable();

  changeAuthStatus(value: boolean) {
    this.loggedIn.next(value);
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private http: HttpClient,
    private token: TokenService,
    public router: Router
  ) { }

  public login(user: User) {
    return this.http.post(Constants.API_URL + 'api/login', user, this.httpOptions)
      .pipe(
        map((response: Response) => response)
      );
  }

  public logout() {
    this.token.remove();
    this.changeAuthStatus(false);
    this.router.navigate(['home'])
  }

  public register(user: User) {
    return this.http.post(Constants.API_URL + 'api/register', user, this.httpOptions)
      .pipe(
        map((response: Response) => response)
      );
  }

  public sendPasswordResetLink(data) {
    return this.http.post(Constants.API_URL + 'api/sendPasswordResetLink', data, this.httpOptions)
      .pipe(
        map((response: Response) => response)
      );
  }

  public resetPassword(data) {
    return this.http.post(Constants.API_URL + 'api/resetPassword', data, this.httpOptions)
      .pipe(
        map((response: Response) => response)
      );
  }

  public userActivation(data) {
    return this.http.post(Constants.API_URL + 'api/user/activation', data, this.httpOptions)
      .pipe(
        map((response: Response) => response)
      );
  }

  public changePassword(user) {
    return this.http.post(Constants.API_URL + 'api/changepassword', user, this.httpOptions)
      .pipe(
        map((response: Response) => response)
      );
  }

  public jwt() {
    if (this.token.getToken()) {
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
      return { headers: headers };
    }
  }
}
