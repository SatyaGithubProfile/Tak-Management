import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks.component';
import { UsersComponent } from '../top-nav/users/users.component';
import { AuthService } from '../services/auth.service';


const routes : Routes = [
  { path: 'task',  component: TasksComponent, canActivate:[AuthService] },
  { path: 'users',  component: UsersComponent, canActivate:[AuthService] },
  {path : '',  redirectTo : 'task', pathMatch : 'full'},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports : [RouterModule]
})
export class TasksModule { }
