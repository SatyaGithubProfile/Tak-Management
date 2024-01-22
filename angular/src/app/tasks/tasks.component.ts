import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';
import { task } from '../models/tasks';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {

  tasks: task[] = []

  constructor(private taskServ: TasksService) { }

  ngOnInit(): void {
    this.getTasks()
  }

  getTasks() {
    this.taskServ.getTasks().subscribe((res) => {
      this.tasks = res;
    },
      (err) => console.log("error in task component--->", err)
    );

  }


}
