import { Component, OnDestroy } from '@angular/core';
import { Registration, User, loginModel } from '../models/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {

  registerDetails: Registration = new Registration('New User', 'newuser@gmail.com', '12345');
  userDetails: User = new User('first@gmail.com', '12345');

  errorMessage: string = ''

  constructor(private userServ: UserService, private router: Router) {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
      this.userServ.navHide$.next(false);
    }
  }

  login() {
    this.errorMessage = '';
    this.userServ.login(this.userDetails).
      subscribe(
        (resp: loginModel) => {
          localStorage.removeItem('token');
          localStorage.setItem('token', resp.token);
          localStorage.setItem('data', JSON.stringify(resp.data));
          this.userServ.navHide$.next(true);
          this.router.navigate(['task']);
        },
        (err) => {
          this.errorMessage = err.error;
        }
      )

  }


  onSignUp() {
    this.userServ.signUp(this.registerDetails).subscribe(
      (resp) => {
        localStorage.setItem('token', resp.token);
        this.userServ.navHide$.next(true);
        this.router.navigate(['task']);
      },
      (err) => this.errorMessage = err.error);
  }

  ngOnDestroy(): void {
    this.errorMessage = '';
  }

}
