import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import {UserService} from '../user.service'
import {ErrorService} from '../error.service'
import {Checkout} from '../checkout'


@Component({
  selector: 'app-signed-in',
  templateUrl: './signed-in.component.html',
  styleUrls: ['./signed-in.component.css']
})
export class SignedInComponent implements OnInit {

  history:Checkout[]

 constructor(private userService:UserService, private http:Http, private errorService:ErrorService) { }

  ngOnInit() {

    this.http.get(`http://localhost:3000/user/${this.userService.user.username}/history?token=${this.userService.token}`)
        .map(res=>res.json())
        .subscribe(res=>this.handleGetHistory(res))
  }

  handleGetHistory(res):void{

    this.errorService.handleGetResponse(res)

    if(res.data!=null){
      this.history = res.data;
    }
  }
}
