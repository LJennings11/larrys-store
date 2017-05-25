import { Injectable} from '@angular/core';
import { UserService } from './user.service'
import { ErrorService } from './error.service'
import { Observable } from 'rxjs/Observable';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router'


@Injectable()
export class NonAdminOnly implements CanActivate {
    
  constructor(private userService: UserService, private router:Router,private errorService:ErrorService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    // If we are an admin
    if(!this.userService.isNonAdmin()){

      this.errorService.add("Login to a member account to view this page.")
      this.router.navigate(["/"]);

      return false;
    }
    return this.userService.isNonAdmin();
  }
}