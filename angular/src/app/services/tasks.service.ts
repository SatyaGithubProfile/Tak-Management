import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/tasks';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  swaggerURL: string = 'http://localhost:3003/'

  constructor(private http: HttpClient) { }
  
  getTasks() {
    return this.http.get<Task[]>(this.swaggerURL + 'tasks');
  }

  postTask(task: Task) {
    return this.http.post<Task>(this.swaggerURL + 'tasks/', task);
  }

  updateTask(id: string, task: Task) {
    return this.http.put<Task>(this.swaggerURL + 'tasks/' + id, task);
  }

  deleteTask(id: string) {
    return this.http.delete(this.swaggerURL + 'tasks/' + id);
  }
  


}
