import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http'
import {Item} from './Item'
import {UserService} from './user.service'
import {ErrorService} from './error.service'
import 'rxjs/add/operator/map'
@Injectable()
export class StuffService {
  
  constructor(private http:Http, private userService:UserService, private errorService:ErrorService) { }
  
  checkResponse(res){
    
  }

  getStock(query?:string):Observable<any>{

    if(query==undefined||query==null)query="";
    else query = "?query="+query;

    return this.http
            .get("http://localhost:3000/items"+query)
            .map(res => res.json())            
  }


  getItem(id:string):Observable<any>{

    return this.http
            .get("http://localhost:3000/item/"+id)
            .map(response => response.json())
  }


  clear():void{

    alert("todo clear")

    //this.getStock().subscribe(items=>items.splice(0,items.length));
  }

  clearCounts():void{

    alert("todo clearCounts")
     
     //this.getStock().subscribe(items=>items.forEach(curr => curr.count=0) );
  }

  getSimilarItems(id):Observable<any>{

    return this.http
          .get("http://localhost:3000/items/similar/"+id)
          .map(res => res.json())
  }


  getInvidualItemNames(){

    alert("todo getInvidualItemNames")

  }

  getItemNameListFromObjects(items:Item[]):string[]{
    var ls:string[] = []

    for(var i=0;i<items.length;i++){

      ls.push(items[i].name)
    }

    return ls
  }

  addItem(item:Item):Observable<any>{

    var v = this.http
      .post("http://localhost:3000/item/add?token="+this.userService.token,item)
      .map(res=>res.json());

      v.subscribe(res=>this.handleAddIncreaseResponse(res))

      return v;

  }

  handleAddIncreaseResponse(res){
    if(res.result!="success"){
      this.errorService.add(res.error)
    }
  }

  updateItem(item:Item):Observable<any>{

    return this.http
      .post("http://localhost:3000/item/update?token="+this.userService.token,{item:item})
      .map(res=>res.json());
  }

  removeItem(item:Item):Observable<any>{

    return this.http
      .post("http://localhost:3000/item/remove?token="+this.userService.token,{id:item.id})
      .map(res=>res.json());
  }
}
