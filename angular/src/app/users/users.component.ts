import { AlertsService } from './../services/alerts.service';
import { Component, OnInit } from '@angular/core';
import { Registration, UserInterface } from '../models/user';
import { UserService } from '../services/user.service';
import { TokenAttachService } from '../services/token-attach.service';
import { skip } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users: Registration[] = [];

  limit: number = 5;
  page: number = 1;
  totalRecords: number = 0;

  constructor(private userServ: UserService, private tokeServ: TokenAttachService, private AlerServ: AlertsService) { }
  ngOnInit(): void {
    // this.getAllUsers();
    this.AlerServ.limitChange$.subscribe((inputLimit: number) => {
      this.limit = inputLimit;
      this.getAllUsers();
    });

    this.AlerServ.pageChange$.pipe(skip(1)).subscribe((inputPageNumber: number) => {
      this.page = inputPageNumber;
      this.getAllUsers();
    })
  }

  // To get all the users
  getAllUsers() {
    const skip = this.page === 1 ? 0 : ((this.page - 1) * this.limit);
    this.userServ.getUsers(this.limit, skip).subscribe(
      (resp: UserInterface) => {
        this.users = resp.data;
        this.totalRecords = resp.count;
        this.AlerServ.totalRecordsShare.emit({ totalRecords: this.totalRecords, limit: this.limit });
      },
      (err) => console.log(err.error)
    )
  }

  // To update the role
  roleUpdate(change: boolean, index: number) {
    if (!this.tokeServ.hasAdminRights()) return this.AlerServ.errorAlert('Only Admin can do this change!');
    this.userServ.updateRole(this.users[index]._id, change).subscribe(
      (resp) => console.log(resp),
      (err) => console.log(err)
    )



  }



}
