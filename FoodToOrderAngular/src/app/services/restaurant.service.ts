import { Injectable } from '@angular/core';
import { Address } from '../models/address';
import { Restaurant } from '../models/restaurant';
import { DishService } from './dish.service';
import { Dish } from '../models/dish';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  baseurl="http://localhost:3000";
  httpHeader={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }


  arrRestaurant:Restaurant[]=[]
  dishes:Dish[]=[]
  constructor(private dishService:DishService,private router:Router,private httpClient:HttpClient) {

  this.dishes=dishService.getDishes()
   let add1=
  [
    new Address(1,'10','street1','area1','city1','state1','country1','12345'),
    new Address(2,'11','street2','area1','city1','state1','country1','12345')
  ]
  let add2=
  [
    new Address(1,'20','street1','area1','city1','state1','country1','12345'),
    new Address(2,'21','street2','area1','city1','state1','country1','12345')
  ]

  this.arrRestaurant=
  [
    new Restaurant(1,'../../assets/images/bobs.jpg',"Bobs",add1,[this.dishes[0],this.dishes[1]],3),
    new Restaurant(2,'../../assets/images/emipre.webp','Empire',add2,[this.dishes[2],this.dishes[3]],3)
  ]
   }
  //  getRest(){
  //   return this.arrRestaurant
  // }

  getRest():Observable<Restaurant[]>{
    return this.httpClient.get<Restaurant[]>(this.baseurl+'/restaurants')
    .pipe(
      catchError(this.httpError)
    )
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

  getRestById(id:number):Observable<Restaurant>{
    return this.httpClient.get<Restaurant>(this.baseurl+'/restaurants/'+id)
    .pipe(
      catchError(this.httpError)
    )
  }


  getRestByOwner(id:number){

    return this.arrRestaurant.filter((res)=>res.ownerid==id)
  }

  addRestaurant(rest:Restaurant):Observable<Restaurant>{
    return this.httpClient.post<Restaurant>(this.baseurl+'/restaurants',JSON.stringify(rest),this.httpHeader)
    .pipe(
      catchError(this.httpError)
    );
  }

  deleteRestaurant(id:number){
    return this.httpClient.delete<Restaurant>(this.baseurl+'/restaurants/'+id)
    .pipe(
      catchError(this.httpError)
    );
  }
  updateRestaurant(u:Restaurant):Observable<Restaurant>{
    return this.httpClient.put<Restaurant>(this.baseurl+'/restaurants/'+u.id,JSON.stringify(u),this.httpHeader)
    .pipe(
      catchError(this.httpError)
    );
  }
}
