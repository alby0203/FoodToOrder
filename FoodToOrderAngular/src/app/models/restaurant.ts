import { Address } from "./address"
import { Dish } from "./dish"

export class Restaurant{
    id:number
    image:string
    name:string
    dishes:Dish[]
    addresses:Address[]
    ownerid:number

    constructor(i:number,im:string,n:string,add:Address[],d:Dish[],oid:number)
    {
        this.id=i
        this.image=im
        this.name=n
        this.addresses=add
        this.dishes=d
        this.ownerid=oid
    }
}