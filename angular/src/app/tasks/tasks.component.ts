import { TaskInterface } from './../models/tasks';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Task } from '../models/tasks';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertsService } from '../services/alerts.service';
import Swal from 'sweetalert2';
import { TasksService } from '../services/tasks.service';
import { Subscription, skip } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit, OnDestroy {
  display = "none";
  tasks: Task[] = [];
  editEnable: boolean = false;
  index: number = 0;
  errorMessage: string = '';  // to store the server side error

  limit: number = 5;
  page: number = 1;
  totalRecords: number = 0;
  limit$:Subscription;
  page$:Subscription;

  constructor(private taskServ: TasksService, private formBuilder: FormBuilder,
    private alerServ: AlertsService) {
      this.limit$ = this.page$ = Subscription.EMPTY;
     }

  ngOnInit(): void {
    this.getTasks();
    this.limit$ =this.alerServ.limitChange$.pipe(skip(1)).subscribe((inputLimit: number) => {
      this.limit = inputLimit;
      this.getTasks();
    });

    this.page$ = this.alerServ.pageChange$.pipe(skip(1)).subscribe((inputPageNumber: number) => {
      this.page = inputPageNumber;
      this.getTasks();
    })
  }

  taskForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    comment: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
  });

  getTasks() {
    const skip = this.page === 1 ? 0 : ((this.page - 1) * this.limit);
    this.taskServ.getTasks(this.limit, skip).subscribe((res: TaskInterface) => {
      this.tasks = res.data;
      this.totalRecords = res.count;
      this.alerServ.totalRecordsShare.emit({ totalRecords: this.totalRecords, limit: this.limit });
    },
      (err) => {
        this.errorMessage = err.error
      }
    );
  }

  saveTask() {
    if (this.editEnable) return this.onEdit();
    const holdTask = new Task(this.taskForm.value.name || '', this.taskForm.value.comment || '')
    this.taskServ.postTask(holdTask).subscribe((result) => {
      this.tasks.push(result);
      this.onCloseHandled();
      this.alerServ.successAlert();
    },
      (err) => this.errorMessage = err.error);
  }

  // to fill the detail on pop-up open
  editOpen(index: number) {
    this.editEnable = true;
    this.index = index;
    this.taskForm.patchValue({
      name: this.tasks[index].name,
      comment: this.tasks[index].comment,
    });
  }

  onEdit() {
    const holdTask = new Task(this.taskForm.value.name || '', this.taskForm.value.comment || '')
    this.taskServ.updateTask(this.tasks[this.index]._id, holdTask).subscribe(
      (res) => {
        this.tasks[this.index].name = res.name;
        this.tasks[this.index].comment = res.comment;
        this.onCloseHandled();
        this.alerServ.successAlert();
      },
      (err) => this.errorMessage = err.error
    )

  }

  onDelete() {

    this.taskServ.deleteTask(this.tasks[this.index]._id).subscribe(
      (res) => {
        this.deletedSuccess();
        this.tasks.splice(this.index, 1)
      },

      (error) => {
        console.log(error.error)
      }
    )

  }



  openModal() {
    this.display = "block";
    if (!this.editEnable) this.taskForm.reset()
  }
  onCloseHandled() {
    this.display = "none";
    this.editEnable = false;
    this.errorMessage = '';
  }




  deleteAlert() {
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
    this.limit$.unsubscribe();
    this.page$.unsubscribe();
  }
}
