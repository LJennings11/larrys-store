import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service'
import {ErrorService} from '../error.service'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private userService:UserService, private errorService:ErrorService) { }

  ngOnInit() {
  }

  login(){
    this.userService
        .login()
        .subscribe(res=>this.handleLoginResponse(res))
  }

  handleLoginResponse(res):void{

    if(res.result=="success"){
      this.userService.user=res.data;
      this.userService.token=res.token;
    }

    this.errorService.handleGetResponse(res);
  }

  signup(){
    this.userService
      .signup()
      .subscribe(res=>this.handleSignupResponse(res))
  }

  handleSignupResponse(res):void{

    this.errorService.handleGetResponse(res);
  }
}
