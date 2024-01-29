import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'angular';
  navHide: boolean = false;
  constructor(private authServ: AuthService, private userServ: UserService) {
    this.userServ.navHide$.subscribe((result) => this.navHide = result);
  }
  ngOnInit(): void {
  }

}
