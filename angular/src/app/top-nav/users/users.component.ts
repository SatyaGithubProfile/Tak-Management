import { AlertsService } from '../../services/alerts.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Registration, UserInterface } from '../../models/user';
import { UserService } from '../../services/user.service';
import { TokenAttachService } from '../../services/token-attach.service';
import { Subscription, skip } from 'rxjs';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit, OnDestroy {
  users: Registration[] = [];
  userForm: FormGroup =   this.formBuilder.group({});

  limit: number = 5;
  page: number = 1;
  totalRecords: number = 0;
  limit$:Subscription;
  page$:Subscription;

  constructor(private userServ: UserService, private tokeServ: TokenAttachService, 
    private formBuilder: FormBuilder,private alertServ: AlertsService) {
      this.limit$ = this.page$ = Subscription.EMPTY;
     }

  ngOnInit(): void {
    this.alertServ.paginationHide$.next(false);
    this.getAllUsers();
    this.limit$ = this.alertServ.limitChange$.pipe(skip(1)).subscribe((inputLimit: number) => {
      this.limit = inputLimit;
      this.getAllUsers();
    });

    this.page$ =this.alertServ.pageChange$.pipe(skip(1)).subscribe((inputPageNumber: number) => {
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
        this.users.forEach((record) => {
          this.userForm.addControl(record._id, new FormControl(record.isAdmin));
        });
        this.totalRecords = resp.count;
        this.alertServ.totalRecordsShare.emit({ totalRecords: this.totalRecords, limit: this.limit });
      },
      (err) => this.alertServ.errorAlert(err.error)
    )
  }

  // To update the role
  roleUpdate(change: boolean, index: number) {
    if (!this.tokeServ.hasAdminRights()) {
      setTimeout(() => {
        if (this.userForm.contains(this.users[index]._id))  this.userForm.get(this.users[index]._id)?.setValue(!this.userForm.get(this.users[index]._id)?.value);
      }, 1000)
      return this.alertServ.errorAlert('Only Admin can do this change!');
    }
    this.userServ.updateRole(this.users[index]._id, change).subscribe(
      (resp) => {
        this.users[index].isAdmin = false;
      },
      (err) => {
        this.alertServ.errorAlert(err.error);
        if (this.userForm.contains(this.users[index]._id)) this.userForm.get(this.users[index]._id)?.setValue(!this.userForm.get(this.users[index]._id)?.value);
      }
    )


  }

  ngOnDestroy(): void {
    this.alertServ.resetPagination$.next(true);
    this.limit$.unsubscribe();
    this.page$.unsubscribe();
  }

}
