import { Injectable } from '@angular/core';
import { Dish } from '../models/dish';
import { DishService } from './dish.service';
import { Cart } from '../models/cart';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart:Cart[]=[]
  dishes:Dish[]=[]
  baseurl="http://localhost:3000";

  httpHeader={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  constructor(private dishService:DishService,private router:Router,private httpClient:HttpClient) {
    this.dishes=dishService.getDishes()
    // this.cart=[
    //   new Cart(201,301,[this.dishes[0],this.dishes[1]]),
    //   new Cart(202,302,[this.dishes[1],this.dishes[2]]),
    //   new Cart(203,303,[this.dishes[2],this.dishes[3]]),
    //   new Cart(204,304,[this.dishes[3],this.dishes[4]])
    // ]
  }
  httpError(error:HttpErrorResponse){
    let msg=''
    if(error.error instanceof ErrorEvent){
      msg=error.error.message
    }
    else{
      msg='Error Code: ${error.status}\n Message: ${error.message}';
    }
    console.log(msg)
    return throwError(msg)

  }

  
  getCart():Observable<Cart[]>{
    //return this.cart
    return this.httpClient.get<Cart[]>(this.baseurl+'/carts')
    .pipe(
      catchError(this.httpError)
    );
  }

  getCartbyId(id:number):Observable<Cart>{
    // for(let i=0;i<this.cart.length;i++){
    //   if(this.cart[i].id==id){
    //     //console.log(id+"fasdf")
    //     return this.cart[i]
    //     break
    //   }
    //   this.router.navigate(['404'])
      
    // }
    // return new Cart(0,0,[])

    return this.httpClient.get<Cart>(this.baseurl+'/carts/'+id)
    .pipe(
      catchError(this.httpError)
    );

  }

  deleteCart(id:number):Observable<Cart>{
    return this.httpClient.delete<Cart>(this.baseurl+'/carts/'+id)
  }

  updatecart(c:Cart):Observable<Cart>{
    //console.log("hi")
    return this.httpClient.put<Cart>(this.baseurl+'/carts/'+c.id,JSON.stringify(c),this.httpHeader)
    .pipe(
      catchError(this.httpError)
    );
  } 

  addCart(c:Cart):Observable<Cart>{
    console.log(JSON.stringify(c))
    return this.httpClient.post<Cart>(this.baseurl+'/carts',JSON.stringify(c),this.httpHeader)
    .pipe(
      catchError(this.httpError)
    );
  }

}
