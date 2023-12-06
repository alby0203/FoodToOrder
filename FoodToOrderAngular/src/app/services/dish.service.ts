import { Injectable } from '@angular/core';
import { Dish } from '../models/dish';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  dishes:Dish[]=[]

  constructor( ) {
    let dishes1=[
      new Dish(1001,'','biriyani',true,450),
      new Dish(1002,'','burger',true,300),
      new Dish(1003,'','dosa',true,150),
      new Dish(1004,'','soup',true,200)
    ]
    this.dishes=dishes1
   }
   getDishes(){
    return this.dishes
  }

}
