import { Component, Input, OnInit,EventEmitter, Output} from '@angular/core';
import {Item} from '../item'
import {StuffService} from '../stuff.service'
import {ActivatedRoute,Router} from '@angular/router'
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  
})
export class ItemComponent implements OnInit {

  @Input() public item:Item;
  @Input() public index:number;

  @Output() public onRemove:EventEmitter<Item> = null;
  @Output() public onBuy:EventEmitter<Item> = null;
  @Output() public onUpdate:EventEmitter<Item> = null;
  @Output() public onAdd:EventEmitter<Item> = null;

  @Input() enableBuy:boolean = true;
  @Input() enableAdd:boolean = false;
  @Input() enableRemove:boolean = true;
  @Input() enableUpdate:boolean = true;
  @Input() enableDescription:boolean = true;
  @Input() small:boolean = false;
  @Input() admin:boolean = false;
  @Input() link:boolean = true;
  @Input() wide:boolean = false;


  constructor(private stuffService:StuffService, private route:Router) { 
      this.onRemove = new EventEmitter<Item>();
      this.onBuy = new EventEmitter<Item>();
      this.onUpdate = new EventEmitter<Item>();
      this.onAdd = new EventEmitter<Item>();
    }

  ngOnInit() {
  }

  showDetails():void{
    if(this.link)this.route.navigateByUrl("/item/"+this.item.id);
  }

  buy():void{

    this.onBuy.emit(this.item);

  }

  remove():void{

    this.onRemove.emit(this.item);
  }
  update():void{

    this.onUpdate.emit(this.item);
  }
  add():void{

    this.onAdd.emit(this.item);
  }

  getStockStatus(item:Item):string{

        // Return the proper status if the item is out of stock
      if(item.count==0)return "out-of-stock";
      return "in-stock";
  }

}
