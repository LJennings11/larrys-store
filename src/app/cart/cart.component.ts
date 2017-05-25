import { Component, OnInit } from '@angular/core';
import {StuffService} from '../stuff.service'
import {UserService} from '../user.service'
import {CartService} from '../cart.service'
import {Item} from '../item'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  constructor(private stuffService:StuffService,private userService:UserService, private cartService:CartService) { }

  ngOnInit() {
  }
  buyAll():void{


    this.cartService.buy();
  }
  removeFromCart(item:Item){

     this.cartService.removeItem(item);

  }

}
