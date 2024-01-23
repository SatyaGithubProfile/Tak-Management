import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { task } from '../models/tasks';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  swaggerURL: string = 'http://localhost:3003/'

  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get<task[]>(this.swaggerURL + 'tasks');
  }


}
