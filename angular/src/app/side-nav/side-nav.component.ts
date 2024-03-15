import { Component, OnInit } from '@angular/core';
import { loginModel } from '../models/user';
import { AlertsService } from '../services/alerts.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent implements OnInit {
  data: string = ''
  name: string = '';
  admin: string = '';
  navigationSection: string = 'shopping'
  constructor(private alertServ: AlertsService) { }
  ngOnInit(): void {

    this.alertServ.sideNavUpdate$.subscribe((result) => {
      setTimeout(() => {
        this.navigationSection = result
      }, 100);
    });

    this.data = (typeof localStorage !== 'undefined') ? localStorage.getItem('data') || '' : '';
    this.name = JSON.parse(this.data).name;
    this.admin = JSON.parse(this.data).isAdmin ? 'Admin' : 'User';
  }

}
