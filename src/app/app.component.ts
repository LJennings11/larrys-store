import { Component, OnInit } from '@angular/core';
import { Location} from '@angular/common';
import {Item} from './item'
import {FormControl} from '@angular/forms';
import {StuffService} from './stuff.service'
import {ErrorService} from './error.service'
import {CartService} from './cart.service'
import {UserService} from './user.service'
import {Router,ActivatedRoute,Params,NavigationEnd} from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public title:string = 'Larry\'s emporium of wonderful goods!';

  public routeCurrent:string = "main"

  public search:string = "";

  public revenue:number = 0;
  
  constructor(
    private location: Location, 
      private router:Router,
      private route: ActivatedRoute,
      private stuffService:StuffService, 
      private cartService:CartService,
      private userService:UserService, 
      private errorService:ErrorService){

    this.title = 'Larry\'s emporium of Super Wonderful Goods!';
  }

  currentRouteIs(r):boolean{
    return this.routeCurrent.toLowerCase().includes(r.toLowerCase());
  }

  ngOnInit():void{ 

    // Get subscribe to get the current route
    this.router.events.subscribe((val) => {
        if(this.location.path() != ''){
            this.routeCurrent = this.location.path();
        } else {
            this.routeCurrent = 'main'
        }
    });

    // Get the query params as our serach
     this.route.queryParams
        .subscribe((params: Params) => this.search=params["query"])

  }


  doSearch():void{
      this.router.navigate(['/search'],{ queryParams: { query:this.search}})
  }
}
