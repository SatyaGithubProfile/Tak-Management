import { Injectable } from '@angular/core';
import { Registration, User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Environment } from '../environment';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  navHide$ = new BehaviorSubject<boolean>(false);  // To hide the navigation on logout

  constructor(private http: HttpClient, private router: Router) { }

  login(user: User) {
    return this.http.post(Environment.swaggerUrl + 'user', user, { observe: 'response' })
  }


  logout() {
    localStorage.removeItem('token');
    this.navHide$.next(false);
    this.router.navigate([`login`]);

  }

}
