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

    if(localStorage.getItem("token")!=null&&this.userService.user==null){

        var token = localStorage.getItem("token");
        var username = localStorage.getItem("username");

        this.userService.token = token;
        this.userService.username = username;
        this.userService.password=null;

        this.login();

    }
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

      localStorage.setItem('token', res.token);
      localStorage.setItem('username', res.data.username);
    }

    this.errorService.handleGetResponse(res);
  }

  signup(){
    this.userService
      .signup()
      .subscribe(res=>this.handleSignupResponse(res))
  }

  handleSignupResponse(res):void{

    if(res.result=="success"){
      this.userService.user=res.data;
      this.userService.token=res.token;
    }

    this.errorService.handleGetResponse(res);
  }
}
