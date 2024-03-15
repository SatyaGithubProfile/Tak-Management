import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { ShoppingModule } from './shopping/shopping.module';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'task',  component: TasksComponent, canActivate:[AuthService] },
  { path: 'users',  component: UsersComponent, canActivate:[AuthService] },
  {
    path: 'shopping',
    loadChildren: () => import('./shopping/shopping.module').then(m => m.ShoppingModule)
   },
  { path: '**', redirectTo: 'login' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes), 
    ShoppingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
