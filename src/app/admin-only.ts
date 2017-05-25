import { Injectable} from '@angular/core';
import { UserService } from './user.service'
import { ErrorService } from './error.service'
import { Observable } from 'rxjs/Observable';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router'

@Injectable()
export class AdminOnly implements CanActivate{

  constructor(private userService: UserService, private router:Router,private errorService:ErrorService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if(!this.userService.isAdmin()){

      this.errorService.add("You cannot access this page.")
      this.router.navigate(["/"]);

      return false;
    }
    return this.userService.isAdmin();
  }
}