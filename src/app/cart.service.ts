import { Injectable } from '@angular/core';
import {Http} from '@angular/http'
import {Item} from './item'
import {UserService} from './user.service'
import {ErrorService} from './error.service'

@Injectable()
export class CartService {

  cart:Item[] = []

  constructor(private http:Http, private userService:UserService,private errorService:ErrorService) { }

  buy(){

    console.log(this.userService.user.username)

    this.http
      .post("http://localhost:3000/items/buy?token="+this.userService.token,
        { 
          items:this.cart,
          username:this.userService.user.username 
        })
      .map(res=>res.json())
      .subscribe(res=>this.handleBuyResponse(res));
  }

  handleBuyResponse(res):void{

    if(res.result!="success"){

      this.errorService.add(res.error);
    }else{
      this.cart = [];
    }
  }

  addItem(item:Item):void{

    // Add to the cart
    this.cart.push(new Item(item.name,item.category,item.rating,item.price,item.description,item.image));
  }

  clear():void{

    this.cart.splice(0,this.cart.length);
  }

  getTotal():number{

    var rev = 0

      for(var i=0;i<this.cart.length;i++){

        if(!this.cart[i].sale)rev+=this.cart[i].price;
        else rev+=0.5*this.cart[i].price;
    }

    return rev
  }

  removeItem(item:Item):void{

    for(var i=0;i<this.cart.length;i++){

      if(this.cart[i].name.toLowerCase()==item.name.toLowerCase()){

        console.log("Decreasing/Removing "+this.cart[i].name)

        this.cart[i].count--;

        if(this.cart[i].count<=0){
          this.cart=this.cart.filter(c=>c.name.toLowerCase()!=this.cart[i].name.toLowerCase());

        }

        return;
      }
    }
  }
}
