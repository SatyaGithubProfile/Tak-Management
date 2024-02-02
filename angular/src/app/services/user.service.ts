import { Injectable } from '@angular/core';
import { Registration, User, UserInterface, loginModel } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Environment } from '../environment';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

interface ApiResponse {
  code: number,
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  navHide$ = new BehaviorSubject<boolean>(false);  // To hide the navigation on logout

  constructor(private http: HttpClient, private router: Router) { }

  login(user: User): Observable<loginModel> {
    return this.http.post<loginModel>(Environment.swaggerUrl + 'user/login', user);
  }

  signUp(user: Registration): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(Environment.swaggerUrl + 'user/registration', user);
  }

  getUsers(limit:number, page:number) {
    return this.http.get<UserInterface>(Environment.swaggerUrl + 'user?limit=' + limit + '&page=' + page);
  }

  updateRole(id: string, isAdmin: boolean) {

    return this.http.patch(Environment.swaggerUrl + 'user/role-update', { 'id':id, isAdmin });

  }


  logout() {
    localStorage.removeItem('token');
    this.navHide$.next(false);
    this.router.navigate([`login`]);
  }

}
