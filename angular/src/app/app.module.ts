import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { TokenAttachService } from './services/token-attach.service';
import { UsersComponent } from './top-nav/users/users.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ShoppingModule } from './shopping/shopping.module';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    TopNavComponent,
    SideNavComponent,
    LoginComponent,
    UsersComponent,
    PaginationComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ShoppingModule
  ],
  providers: [
    provideClientHydration(),
    AuthService,
     {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenAttachService,
      multi:true
     }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
