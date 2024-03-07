import { AlertsService } from './services/alerts.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { TasksService } from './services/tasks.service';
import { skip } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'angular';
  navHide: boolean = false;

  constructor( private userServ: UserService, private alertServ:AlertsService) {
    this.userServ.navHide$.subscribe((result) => this.navHide = result);
  }
  ngOnInit(): void {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('token') && localStorage.getItem('token') !== null) this.navHide = true;
  }

}