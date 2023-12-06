import { Dish } from "./dish"

export class Cart{
    id:number
    amount:number
    dishes:Dish[]
    count:number[]

    constructor(i:number,a:number,d:Dish[],c:number[]){
        this.id=i
        this.amount=a
        this.dishes=d
        this.count=c
    }
}