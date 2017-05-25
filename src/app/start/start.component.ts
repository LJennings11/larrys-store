import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service'

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

 constructor(private userService:UserService) { }

  ngOnInit() {
  }

}
