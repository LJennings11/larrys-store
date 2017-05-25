import { Component, OnInit } from '@angular/core';
import {StuffService} from '../stuff.service'
import {UserService} from '../user.service'
import {CartService} from '../cart.service'

// Keep the Input import for now, you'll remove it later:
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import {Item} from '../item'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  item:Item;
  similarItems:Item[];

  constructor(private route: ActivatedRoute,private stuffService:StuffService,private userService:UserService, private cartService:CartService) { }

  ngOnInit() {
     this.route.params
        .map((params: Params) => params['id'])
        .subscribe(id => this.getData(id))


  }

  getData(id){
    this.stuffService.getItem(id).subscribe(res=>this.item=res.data);
    this.stuffService.getSimilarItems(id).subscribe(res=>this.similarItems=res.data);
  }

  buy():void{

    this.cartService.addItem(this.item);
  }
}
