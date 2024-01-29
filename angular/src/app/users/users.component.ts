import { AlertsService } from './../services/alerts.service';
import { Component, OnInit } from '@angular/core';
import { Registration } from '../models/user';
import { UserService } from '../services/user.service';
import { TokenAttachService } from '../services/token-attach.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users: Registration[] = [];

  constructor(private userServ: UserService, private tokeServ:TokenAttachService, private AlerServ:AlertsService) { }
  ngOnInit(): void {
    this.getAllUsers()
  }

  // To get all the users
  getAllUsers() {
    this.userServ.getUsers().subscribe(
      (resp) => {
        this.users = resp
      },

      (err) => console.log(err.error)
    )
  }

// To update the role
  roleUpdate(change:boolean, index:number) {
   if(!this.tokeServ.hasAdminRights()) return this.AlerServ.errorAlert('Only Admin can do this change!');
   console.log(this.users, index, this.users[index]._id, change)

   this.userServ.updateRole(this.users[index]._id, change).subscribe(
    (resp) => console.log(resp),
    (err)  => console.log(err)
   )



  }



}
