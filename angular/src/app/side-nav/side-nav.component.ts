import { Component, OnInit } from '@angular/core';
import { loginModel } from '../models/user';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent implements OnInit {
   data:string = ''
   name :string = '';
   admin : string = '';
   navigationSection :string = 'shopping'
  ngOnInit(): void {
   this.data = localStorage.getItem('data') || '';
   this.name = JSON.parse(this.data).name;
   this.admin = JSON.parse(this.data).isAdmin ? 'Admin' : 'User';
  }

}
