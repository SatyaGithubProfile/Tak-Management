import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

interface CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
}

@Injectable({
  providedIn: 'root'
})


export class AuthService implements CanActivate {

  

  constructor(private router : Router ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    if (typeof localStorage === 'undefined')  return false;

   if (!this.isAuthenticated()) {
      // this.router.navigate(['login']);
      this.router.navigate([`login`]);
      return false;
    }
    return true;
  }

   // need to check token available or not?

  public isAuthenticated(): boolean {
    if (typeof localStorage !== 'undefined' && localStorage.getItem("token") !== null && localStorage.getItem('token')) return true;
    return false;
  }


}