import { Component } from '@angular/core';
import { Registration, User } from '../models/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  registerDetails: Registration = new Registration('New User', 'newuser@gmail.com', '12345');
  userDetails: User = new User('first@gmail.com', '12345');

  errorMessage: string = ''

  constructor(private userServ: UserService, private router: Router) {
    if(localStorage.getItem('token')) {
      localStorage.removeItem('token');
      this.userServ.navHide$.next(false);
    }
  }


  login() {
    this.errorMessage = '';
    this.userServ.login(this.userDetails).
    subscribe(
      (resp) => {
        console.log('resp--->', resp)
        localStorage.removeItem('token');
       localStorage.setItem('token',  resp.token);
       this.userServ.navHide$.next(true);
        this.router.navigate(['task']);
      },
      (err) => {
        console.log('error-->', err)
        this.errorMessage = err.error;
      }
    )

  }


  onSignUp() {
    this.userServ.signUp(this.registerDetails).subscribe(
      (resp) => {
        localStorage.setItem('token',  resp.token);
        this.userServ.navHide$.next(true);
         this.router.navigate(['task']);
      },
      (err) => this.errorMessage = err.error);
  }

}
