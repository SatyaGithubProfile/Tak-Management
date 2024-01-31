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
  totalRecords: number = 0;
  pageCount: number[] = [];
  currentPage: number = 1;
  limit: number = 5;



  constructor(private authServ: AuthService, private userServ: UserService, private taskServ: TasksService, private alertServ:AlertsService) {
    this.userServ.navHide$.subscribe((result) => this.navHide = result);
  }
  ngOnInit(): void {
    if (localStorage.getItem('token') && localStorage.getItem('token') !== null) this.navHide = true;
    this.alertServ.totalRecordsShare.subscribe((res) => {
      this.pageCount = [];
      this.totalRecords = 0;
      this.totalRecords = res.totalRecords;
      const count = Math.round(res.totalRecords / this.limit);
      this.limit = res.limit;
      Array(count).fill(count).map((x) => this.pageCount.push(x));
    });
    this.alertServ.limitChange$.pipe(skip(1)).subscribe((res) => this.limit = res);
  }

  pageChanged(page: number, move:string) {
    if(move === 'N' && this.currentPage == this.pageCount[0])  return;
    if(move === 'P' && this.currentPage == 1)  return;
    this.currentPage = page;
    this.alertServ.pageChange$.next(page);
  }



}
