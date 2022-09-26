import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { DatabaseService } from '../services/database/database.service';

@Injectable({
  providedIn: 'root',
})
export class SigninGuard implements CanActivate {
  constructor(private router: Router, private database: DatabaseService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.database.isLogged$.getValue()) {
      this.router.navigate(['profile']);
      return false;
    }
    return true;
  }
}
