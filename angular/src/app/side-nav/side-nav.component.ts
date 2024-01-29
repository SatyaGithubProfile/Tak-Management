import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent {

  constructor(private userServ:UserService) {}


  logout() {
    this.userServ.logout()
  }
}
