import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
// import { ProductsComponent } from '../products/products.component';
import { CustomersComponent } from './customers/customers.component';
import { ProductsComponent } from './products/products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenAttachService } from '../services/token-attach.service';


const routes: Routes = [

  // { path: '', component: CustomersComponent },
  { path: 'customers', component: CustomersComponent, canActivate:[AuthService] },
  { path: 'products', component: ProductsComponent },
  // { path: '**', redirectTo : '', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    CustomersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [RouterModule],
})
export class ShoppingModule { }
