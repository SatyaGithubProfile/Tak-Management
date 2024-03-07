import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Task, TaskInterface } from '../models/tasks';
import { Environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  swaggerURL: string = Environment.swaggerUrl;

  constructor(private http: HttpClient) { }
  
  getTasks(assignedId : String[] = []) {
    // return this.http.get<TaskInterface>(this.swaggerURL + 'tasks?limit='+limit +'&page='+page);
    return this.http.post<TaskInterface>(this.swaggerURL + 'tasks', {'assignEmployee':assignedId});
  }

  postTask(task: Task) {
    return this.http.post<Task>(this.swaggerURL + 'tasks/addTask', task);
  }

  updateTask(id: string, task: Task) {
    return this.http.put<Task>(this.swaggerURL + 'tasks/' + id, task);
  }

  deleteTask(id: string) {
    return this.http.delete(this.swaggerURL + 'tasks/' + id);
  }
  


}
