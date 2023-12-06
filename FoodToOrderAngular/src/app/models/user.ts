 import { Address } from "./address"

export class User{
    id:number
    firstName:string
    lastName:string
    role:string
    dob:string
    email:string
    password:string
    address:Address

    constructor(i:number,fN:string,lN:string,rl:string,date:string,em:string,pwd:string,addr:Address){
        this.id=i;
        this.firstName=fN
        this.lastName=lN
        this.role=rl
        this.dob=date
        this.email=em
        this.password=pwd
        this.address=addr
    }

}