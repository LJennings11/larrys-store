import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import {StuffService} from '../stuff.service'
import {UserService} from '../user.service'
import {CartService} from '../cart.service'
import {Item} from '../item'
@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {


  constructor(private route: ActivatedRoute,private stuffService:StuffService,private userService:UserService,private cartService:CartService) { }

  searchItems:Item[] = [];

  ngOnInit() {

     this.route.queryParams
        .subscribe((params: Params) => this.getItems(params["query"]))
  }

  getItems(query:string):void{


      // Map the search items to the direct value
      this.stuffService
          .getStock(query)
            .map(res=>res.data)
          .subscribe(items=>this.searchItems=items);
  }


  addToCart(item:Item):void{

     this.cartService.addItem(item);
  }


}
