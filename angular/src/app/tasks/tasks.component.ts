import { TaskInterface } from './../models/tasks';
import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { Task } from '../models/tasks';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from '../services/alerts.service';
import Swal from 'sweetalert2';
import { TasksService } from '../services/tasks.service';
import { Subscription, skip } from 'rxjs';
import { UserService } from '../services/user.service';
import { Registration } from '../models/user';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit, OnDestroy {
  display = "none";
  tasks: Task[] = [];
  pendingTasks : Task[] = []; 
  onGoingTasks : Task[] = []; 
  completedTasks : Task[] = []; 
  editEnable: boolean = false;
  index: number = 0;
  errorMessage: string = '';  // to store the server side error

  limit: number = 5;
  page: number = 1;
  totalRecords: number = 0;
  limit$:Subscription;
  page$:Subscription;

  users :Registration[] = [];
  assigneeUsers : string[] = [];
  isDropdownOpen = false;
  statusOfTask : number = 0;


  constructor(private taskServ: TasksService, private formBuilder: FormBuilder,
    private alertServ: AlertsService, private userServ:UserService,
    private renderer: Renderer2, private el: ElementRef) {
      this.limit$ = this.page$ = Subscription.EMPTY;
     }

  ngOnInit(): void {
    this.getUsersList();
   this.getTasks()
    this.limit$ =this.alertServ.limitChange$.pipe(skip(1)).subscribe((inputLimit: number) => {
      this.page = 1;
      this.limit = inputLimit;
      this.getTasks();
  
    });

    this.page$ = this.alertServ.pageChange$.pipe(skip(1)).subscribe((inputPageNumber: number) => {
      this.page = inputPageNumber;
      this.getTasks();
    })
  }
  // assignedUserGroup : FormGroup = this.formBuilder.group({})

  taskForm : FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    comment: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
    assigndUsers: this.formBuilder.group({}),
    status :  [],
    EOD : new Date()
  });

  getUsersList() {
    this.userServ.getUsers(10000,0).subscribe((result) => {
      this.users= result.data;
      let asignUser = this.taskForm.get('assigndUsers') as FormGroup ;
      this.users.forEach((user) => {
        asignUser.addControl(''+user._id, new FormControl(false))
      } )
    })
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;

    // Add or remove a CSS class based on the dropdown state
    if (this.isDropdownOpen) {
      this.renderer.addClass(this.el.nativeElement.querySelector('.dropdown-menu'), 'show');
    } else {
      this.renderer.removeClass(this.el.nativeElement.querySelector('.dropdown-menu'), 'show');
    }
  }

  onCheckboxChange(event : Event, userId: any) {
    if((<HTMLInputElement>event.target).checked) this.assigneeUsers.push(''+userId);
    else {
      this.assigneeUsers.map((user, i) => {
          if(user === userId)  this.assigneeUsers.splice(i, 1);
      })
    }
  }

  selectAssignUsers() {
    if(this.assigneeUsers.length === 0) {
      this.users.map((user) => {
          this.taskForm.get(['assigndUsers', user._id])?.setValue(false);
      })
    }
    this.assigneeUsers.map((user) => {
        this.taskForm.get(['assigndUsers', user])?.setValue(true);
    });
  }


  getTasks() {
    const skip = this.page === 1 ? 0 : ((this.page - 1) * this.limit);
    this.taskServ.getTasks(this.limit, skip).subscribe((res: TaskInterface) => {
      this.pendingTasks = res.data.pendingTasks;
      this.onGoingTasks = res.data.onGoingTasks;
      this.completedTasks = res.data.completedTasks;
      this.totalRecords = res.count;
      this.alertServ.totalRecordsShare.emit({ totalRecords: this.totalRecords, limit: this.limit });
    },
      (err) => {
        this.errorMessage = err.error
      }
    );
  }

  saveTask(status:number = 1) {
    if (this.editEnable) return this.onEdit();
    const holdTask = new Task(this.taskForm.value.name || '', this.taskForm.value.comment || '', this.assigneeUsers, 1, this.taskForm.value.EOD )
    this.taskServ.postTask(holdTask).subscribe((result) => {
      this.pendingTasks.unshift(result);
      this.onCloseHandled();
      this.alertServ.successAlert();
    },
      (err) => this.errorMessage = err.error);
  }

  // to fill the detail on pop-up open
  editOpen(index: number, status:number) {
    this.statusOfTask = status;
    this.assigneeUsers = [];
    this.editEnable = true;
    this.index = index;
    let taskData = status === 1 ? this.pendingTasks[index]  : status == 2 ? this.onGoingTasks[index] : this.completedTasks[index];
    this.taskForm.patchValue({
      name: taskData.name,
      comment: taskData.comment,
      status : taskData.Status || 1,
      EOD : new DatePipe('en-US').transform(taskData.EOD, 'yyyy-MM-dd')
    });
    this.assigneeUsers = taskData.assignEmployee;
    // this.taskForm.get('status')?.setValue(taskData.Status || 1);
    const date =  new DatePipe('en-US').transform(taskData.EOD, 'yyyy-MM-dd')
    // this.taskForm.get('EOD')?.setValue(date);
    this.selectAssignUsers();
  }

  onEdit() {

    const holdTask = new Task(this.taskForm.value.name || '', this.taskForm.value.comment || '', this.assigneeUsers || [],  +this.taskForm.value.status, this.taskForm.value.EOD )
    const taskData = this.statusOfTask === 1 ? this.pendingTasks : this.statusOfTask === 2  ? this.onGoingTasks : this.completedTasks ;
    this.taskServ.updateTask(taskData[this.index]._id, holdTask).subscribe(
      (res) => {
        let taskData = +this.statusOfTask === 1 ? this.pendingTasks  : +this.statusOfTask === 2 ? this.onGoingTasks : this.completedTasks;
         taskData[this.index].name = res.name;
         taskData[this.index].comment = res.comment;
         taskData[this.index].assignEmployee = this.assigneeUsers;
        this.onCloseHandled();
        this.alertServ.successAlert();

        taskData.splice(this.index, 1);
        +this.taskForm.value.status === 1 ? this.pendingTasks.unshift(res)  :  +this.taskForm.value.status === 2 ? this.onGoingTasks.unshift(res)   : this.completedTasks.unshift(res)  ;
      },
      (err) => this.errorMessage = err.error
    )
  }

  onDelete() {
    const taskData = this.statusOfTask === 1 ? this.pendingTasks  : this.statusOfTask ==2 ? this.onGoingTasks : this.completedTasks;
    this.taskServ.deleteTask(taskData[this.index]._id).subscribe(
      () => {
        this.alertServ.successAlert();
        taskData.splice(this.index, 1);
      },
      (error) =>this.alertServ.errorAlert(error.error)
    )

  }



  openModal() {
    this.display = "block";
    if (!this.editEnable) this.taskForm.reset()
  }
  onCloseHandled() {
    this.isDropdownOpen = false;
    this.display = "none";
    this.editEnable = false;
    this.errorMessage = '';
    this.assigneeUsers = [];
  }




  deleteAlert(status :number) {
    this.statusOfTask = status;
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.onDelete();
      }
    });
  }

  deletedSuccess() {
    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
  }


  ngOnDestroy(): void {
    this.alertServ.resetPagination$.next(true);
    this.limit$.unsubscribe();
    this.page$.unsubscribe();
  }

}
