import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { ShoppingComponent } from './shopping/shopping/shopping.component';
import { ProductsComponent } from './shopping/products/products.component';
import { CustomersComponent } from './shopping/customers/customers.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'task',  component: TasksComponent, canActivate:[AuthService] },
  { path: 'users',  component: UsersComponent, canActivate:[AuthService] },
  {
    path: 'shopping',
    component: ShoppingComponent, 
    children: [
      {
        path: 'products', 
        component: ProductsComponent, 
      },
      {
        path: 'customers', 
        component: CustomersComponent, 
      }
    ],
  },
  { path: '**', redirectTo: 'login' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
