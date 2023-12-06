import { Cart } from "./cart"
import { Dish } from "./dish"

export class Order{
    id:number
    date:string
    amount:number
    userid:number
    dishes:Dish[]
    count:number[]

    constructor(id:number,date:string,a:number,u:number,d:Dish[],c:number[]){
        this.id=id
        this.date=date
        this.amount=a
        this.userid=u
        this.dishes=d
        this.count=c
    }
}