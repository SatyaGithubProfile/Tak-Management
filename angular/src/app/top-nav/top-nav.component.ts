import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrl: './top-nav.component.css'
})
export class TopNavComponent {

  constructor(private userServ:UserService) {}


  logout() {
    this.userServ.logout()
  }

}
