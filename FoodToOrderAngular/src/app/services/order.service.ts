import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { Dish } from '../models/dish';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orders:Order[]=[]
  baseurl="http://localhost:3000";

  httpHeader={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  constructor(private router:Router,private httpClient:HttpClient) {

    // let dishes1=[
    //   new Dish(1001,'','biriyani',true,450),
    //   new Dish(1002,'','burger',true,300)
    // ]
    // let dishes2=[
    //   new Dish(1003,'','dosa',true,150),
    //   new Dish(1004,'','soup',true,200)
    // ]
    // this.orders=[
    //   new Order('13/10/2023',1450,101,dishes1),
    //   new Order('12/10/2023',1500,102,dishes2),
    //   new Order('11/10/2023',1300,103,dishes1),
    //   new Order('10/10/2023',1200,104,dishes2)
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

  //  getOrders(){
  //   return this.orders
  // }

  getOrders():Observable<Order[]>{
    return this.httpClient.get<Order[]>(this.baseurl+'/orders')
    .pipe(
      catchError(this.httpError)
    );
  }

  filterOrder(start:string,end:string):Order[]{
    let arrOrders:Order[]=[]
    let resOrders:Order[]=[]
    this.getOrders().subscribe(data=>{
      arrOrders=data
      console.log(arrOrders)
      let startDate=new Date(start)
      let endDate=new Date(end)
      arrOrders.forEach(e=>{
        let curDate=new Date(e.date)
        if(curDate<endDate && curDate>startDate)
          resOrders.push(e)
      })
      return resOrders
    })
 
    return resOrders
  }

  addOrder(o:Order):Observable<Order>{
    return this.httpClient.post<Order>(this.baseurl+'/orders',JSON.stringify(o),this.httpHeader)
    .pipe(
      catchError(this.httpError)
    );
  }

  getOrderbyId(id:number):Observable<Order>{
    return this.httpClient.get<Order>(this.baseurl+'/orders/'+id)
    .pipe(
      catchError(this.httpError)
    );
  }

  deleteOrder(id:number):Observable<Order>{
    return this.httpClient.delete<Order>(this.baseurl+'/orders/'+id)
    .pipe(
      catchError(this.httpError)
    );
  }

  updateOrder(o:Order):Observable<Order>{
    return this.httpClient.put<Order>(this.baseurl+'/orders/'+o.id,JSON.stringify(o),this.httpHeader)
    .pipe(
      catchError(this.httpError)
    );
  }

}
