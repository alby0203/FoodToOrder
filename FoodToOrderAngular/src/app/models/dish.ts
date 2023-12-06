export class Dish{
    id:number
    image:string
    name:string
    isavailable:boolean
    price:number

    constructor(i:number,im:string,n:string,is:boolean,p:number){
        this.id=i
        this.image=im
        this.name=n
        this.isavailable=is
        this.price=p
    }
}