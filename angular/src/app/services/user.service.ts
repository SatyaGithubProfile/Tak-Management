import { Injectable } from '@angular/core';
import { Registration, User } from '../models/user';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Environment } from '../environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  header:any;

  constructor(private http: HttpClient, private router:Router) {
    this.header=new HttpHeaders();
    this.header=this.header.append('ContentType','application/json');
    this.header=this.header.append('Accept','application/json');

   }

  login(user: User) {
     return this.http.post(Environment.swaggerUrl + 'user', user, {  observe: 'response' })
   
  }


  logout() {
    // localStorage.removeItem('x-auth-token');
    this.router.navigate([`login`]);
  }

}
