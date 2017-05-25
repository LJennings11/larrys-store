import { Component, Input, OnInit,EventEmitter, Output} from '@angular/core';
import {Item} from '../item'

@Component({
  selector: 'item-listing',
  templateUrl: './item-listing.component.html',
  styleUrls: ['./item-listing.component.css']
})
export class ItemListingComponent{
    
  @Input() public items:Item[] = [];

  @Output() public onRemove:EventEmitter<Item> = null;
  @Output() public onBuy:EventEmitter<Item> = null;
  @Output() public onUpdate:EventEmitter<Item> = null;

  @Input() public cart:boolean = false;
  @Input() public admin:boolean = false;
  @Input() public enableBuy:boolean = false;
  @Input() public enableRemove:boolean = false;
  @Input() public enableUpdate:boolean = false;
  @Input() public link:boolean = true;
  @Input() public small:boolean = false;
  @Input() public enableDescription:boolean = true;

  constructor(){

      this.onRemove = new EventEmitter<Item>();
      this.onBuy = new EventEmitter<Item>();
      this.onUpdate = new EventEmitter<Item>();
  }

  buy(item:Item):void{

      this.onBuy.emit(item);
  }

  remove(item:Item):void{

        // Emit the event
        this.onRemove.emit(item);
  }

  update(item:Item):void{

        // Emit the event
        this.onUpdate.emit(item);
  }

  getStarIcon(item:Item,ind:number):string{

      if(item.rating<=ind){
          if(item.rating==ind-.5)return "star_half"
          return "star_border";
      }
      else if(item.rating>=ind){
          return "star_rate";
      }
  }

  public areAnyItemsAvailable():boolean{
    return !!this.items.length;
  }
}
