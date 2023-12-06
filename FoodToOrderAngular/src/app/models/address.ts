export class Address{
    id:number
    houseno:string
    street:string
    area:string
    city:string
    state:string
    country:string
    pincode:string

constructor(id:number,hno:string,st:string,ar:string,city:string,sta:string,ct:string,code:string){
    this.id=id
    this.houseno=hno
    this.street=st
    this.area=ar
    this.city=city
    this.state=sta
    this.country=ct
    this.pincode=code
}

}