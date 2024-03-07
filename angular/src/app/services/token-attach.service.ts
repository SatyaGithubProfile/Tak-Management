import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

interface TokenInterface {
  _id:string;
  isAdmin:string;
  iat : string;
}

@Injectable({
  providedIn: 'root'
})
export class TokenAttachService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') || '' : '';
    const authRequest = req.clone({
      setHeaders: {
        'token': token
      }
    })

    return next.handle(authRequest);
  }

  // To check the current User isAdmin or not...
  hasAdminRights() {
    const token = localStorage.getItem('token') || '';
    if(!token) return false;
    const decodedToken:TokenInterface = jwtDecode(token);
    return decodedToken.isAdmin;  // return the current logged-In isAdmin true/false
  }

}
