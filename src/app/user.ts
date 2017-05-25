export class User {
    username:string;
    password:string;
    admin:boolean;

    constructor(u:string,p:string,a:boolean){
        this.username = u;
        this.password = p;
        this.admin = a;
    }
}
