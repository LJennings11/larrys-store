import { Component, OnInit } from '@angular/core';
import {StuffService} from '../stuff.service'
import {UserService} from '../user.service';
import {CartService} from '../cart.service';
import {ErrorService} from '../error.service';
import {Item} from '../item'

@Component({
  selector: 'app-inventory-management',
  templateUrl: './inventory-management.component.html',
  styleUrls: ['./inventory-management.component.css']
})
export class InventoryManagementComponent implements OnInit {

  stock:Item[] = []
  create:Item = new Item("","",2.5,1,"","");

  constructor(
    private stuffService:StuffService,
    private userService:UserService, 
    private cartService:CartService, 
    private errorService:ErrorService) { }

  ngOnInit() {

    this.stuffService.getStock().subscribe(items=>this.stock=items.data);
  }



  add(newItem:Item):void{

     this.stuffService
         .addItem(newItem)
         .subscribe(res=>this.handleCreateResponse(res));
  }

  handleCreateResponse(res):void{

    if(res.data!=null){
      this.stock=res.data;
    }

    this.errorService.handleGetResponse(res);
  }

  clearInventory():void{

    this.stuffService.clearCounts();
  }

  clearStock():void{

    this.stuffService.clear();
  }

  updateItem(item:Item){

    this.stuffService.updateItem(item)
      .subscribe(res=>this.handleUpdateResponse(res));
  }

  handleUpdateResponse(res){

    if(res.data!=null){
      this.stock=res.data;
    }

    this.errorService.handleGetResponse(res);

  }

  removeFromStock(item:Item){

    this.stuffService.removeItem(item)
        .subscribe(res=>this.stock=res.data);

    this.cartService.removeItem(item);
  }
}
