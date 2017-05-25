export class Item{
    id:string;
    name:string;
    description:string;
    category:string;
    rating:number;
    price:number;
    count:number;
    sale:boolean;
    image:string;

    constructor(n:string,c:string,r:number,p:number,d:string,i:string){
        this.name = n;
        this.category = c;
        this.rating = r;
        this.price = p;
        this.count=1;
        this.sale=false;
        this.description = d;
        this.image=i;
    }

    onSale():boolean{
        return this.sale;
    }

    inStock():boolean{
        return this.count>0;
    }
}