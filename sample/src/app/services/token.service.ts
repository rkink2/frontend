import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  public user?: User = null;
  private syncUserSubject = new Subject<any>();

  constructor() { }

  public handle(data) {
    this.setToken((data['token']));
    this.setUser((data['user']))
  }

  private setToken(token): void {
    localStorage.setItem('token', token);
  }

  public getToken(): any {
    return localStorage.getItem('token');
  }

  public setUser(user): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.syncUserSubject.next(user);
  }


  public getUser(): any {
    if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user'));
    } else {
      return null;
    }
  }

  syncUser(): any {
    return this.syncUserSubject.asObservable();
  }

  public remove(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.clear();
  }
  private isValid(): any {
    const token = this.getToken();
    if (this.getToken() !== null) {
      const payload = this.payload(token);
      if (payload) {
        return true;
      }
    }
  }

  private payload(token) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  private decode(payload) {
    return JSON.parse(atob(payload));
  }

  public loggedIn() {
    return this.isValid();
  }

  /**
   * checking funtion to confirm that password and conformpassword match
   * 
   * @param controlName password field
   * @param matchingControlName confirm password field
   */

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

}
