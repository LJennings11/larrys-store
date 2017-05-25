import { Injectable } from '@angular/core';
import {User} from './user'
import {ErrorService} from './error.service'
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http'

@Injectable()
export class UserService {

  user:User = null;

  username:string;
  password:string;

  usernameSU:string;
  passwordSU:string;
  adminSU:boolean;

  token:string;

  constructor(private errorService:ErrorService, private http:Http) { }

  login():Observable<any>{


   return this.http
      .post("http://localhost:3000/login",{username:this.username,password:this.password})
      .map(res=>res.json())


  }

  handleLoginResponse(t,res):void{

    if(res.result!="success"){

      this.errorService.add("There are no users/passwords matching that combination");
    }else{

      this.token = res.token;
      this.user = res.data;
    }
  }

  removeUser(user:User):Observable<User[]>{

    return this.http
      .post(`http://localhost:3000/delete/user?token=${this.token}`,{username:user.username})
      .map(res=>res.json())
      .do(res=>this.handleDeleteUserResponse(res))
      .map(res=>res.data)

  }

  handleDeleteUserResponse(res):void{

    if(res.result!="success"){

      this.errorService.add(res.error)
    }
  }

  signup():Observable<User>{

    return this.http
      .post("http://localhost:3000/signup",{
              username:this.usernameSU,
              password:this.passwordSU,
              admin:this.adminSU})
      .map(res => res.json()) 

  }

  handleSignupResponse(res):void{

    if(res.result!="success"){
      this.errorService.add(res.error)
    }else{
      this.user = res.data  as User;
    }
  }

  logout():void{

    this.user = null;
    this.token = null;
  }

  isMember():boolean{

    return this.user!=null;
  }


  isAdmin():boolean{

    return this.isMember()&&this.user.admin;
  }

  isNonAdmin():boolean{

    return this.isMember()&&!this.user.admin;
  }
}
