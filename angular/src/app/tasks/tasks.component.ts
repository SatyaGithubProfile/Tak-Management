import { Component, OnInit } from '@angular/core';
import { Task } from '../models/tasks';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertsService } from '../services/alerts.service';
import Swal from 'sweetalert2';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {
  [x: string]: any;
  display = "none";
  tasks: Task[] = [];
  editEnable : boolean = false;
  index: number = 0;
  errorMessage:string='';  // to store the server side error

  constructor(private taskServ: TasksService, private formBuilder: FormBuilder, 
              private alerServ:AlertsService) { }

  ngOnInit(): void {
    this.getTasks()
  }

  taskForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    comment: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
  });

  getTasks() {
    this.taskServ.getTasks().subscribe((res) => {
      this.tasks = res;
    },
      (err) => {
        this.errorMessage = err.error
      }
    );

  }

  saveTask() {
    if(this.editEnable) return this.onEdit();
    const holdTask = new Task(this.taskForm.value.name || '', this.taskForm.value.comment || '')
    this.taskServ.postTask(holdTask).subscribe((result) => {
      this.tasks.push(result);
      this.onCloseHandled();
      this.alerServ.successAlert();
    },
      (err) => this.errorMessage = err.error);
  }

// to fill the detail on pop-up open
  editOpen(index : number){
    this.editEnable = true;
    this.index = index;
    this.taskForm.patchValue({
      name : this.tasks[index].name,
      comment : this.tasks[index].comment,
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
    if(!this.editEnable) this.taskForm.reset()
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
}
