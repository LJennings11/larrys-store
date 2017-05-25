import { Component, OnInit } from '@angular/core';
import  {Checkout} from '../checkout'
import {Http} from '@angular/http'
import {UserService} from '../user.service'
import {ErrorService} from '../error.service'

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  history:Checkout[] = [];

  constructor(private http:Http, private userService:UserService, private errorService:ErrorService) { }

  ngOnInit() {

    this.http.get(`http://localhost:3000/user/history?token=${this.userService.token}`)
        .map(res=>res.json())
        .subscribe(res=>this.handleHistoryResponse(res))
  }

  handleHistoryResponse(res):void{

    this.errorService.handleGetResponse(res);

    if(res.data!=null){
      this.history = res.data;
    }
  }

}
