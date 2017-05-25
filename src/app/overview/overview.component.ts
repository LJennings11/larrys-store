import { Component, OnInit } from '@angular/core';
import { StuffService } from '../stuff.service'
import { UserService } from '../user.service';
import { ErrorService } from '../error.service';
import { Item } from '../item';
import { User } from '../user';
import {Http} from '@angular/http'

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  stock:Item[] = []
  users:User[] = [];

  revenue:number;
  itemCount:number;
  userCount:number;

  constructor(private stuffService: StuffService, private userService: UserService, private errorService:ErrorService, private http:Http) { }

  ngOnInit() {

    this.stuffService.getStock().subscribe(items=>this.stock=items);

    this.http.get("http://localhost:3000/overview?token="+this.userService.token)
      .map(res=>res.json())
      .subscribe(res=>this.handleGetOverview(res))

    this.http.get("http://localhost:3000/users?token="+this.userService.token)
      .map(res=>res.json())
      .subscribe(res=>this.handleGetUsers(res))

  }
  
  handleGetUsers(res){

    if(res.result!="success"){
      this.errorService.add(res.error)

    }else{
      this.users = res.data
    }
  }

  handleGetOverview(res){

    if(res.result!="success"){
      this.errorService.add(res.error)
    }else{
      this.revenue=res.data.revenue;
      this.itemCount=res.data.count;
      this.userCount=res.data.users;
    }
  }

  removeUser(user){


    this.http.post(`http://localhost:3000/user/${user.username}/delete?token=`+this.userService.token,{})
      .map(res=>res.json())
      .subscribe(res=>this.handleGetUsers(res))
  }


}
