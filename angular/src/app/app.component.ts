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
  // totalRecords: number = 0;
  // pageCount: number[] = [];
  // currentPage: number = 1;
  // limit: number = 5;



  constructor( private userServ: UserService) {
    this.userServ.navHide$.subscribe((result) => this.navHide = result);
  }
  ngOnInit(): void {
    if (localStorage.getItem('token') && localStorage.getItem('token') !== null) this.navHide = true;
  }



}
