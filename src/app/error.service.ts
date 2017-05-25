import { Injectable } from '@angular/core';

@Injectable()
export class ErrorService {

  private errors:string[] = [];

  constructor() { }

  add(error:string):void{

    this.errors = this.errors.concat([error])
  }

  remove(error:string):void{

    this.errors = this.errors.filter(e=>e!=error);
  }

  handleGetResponse(res){
    if(res.result!="success"){
      this.add(res.error)
    }
  }
}
