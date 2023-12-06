import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { Address } from '../models/address';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { token } from '../models/token';

////import { token } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseurl="http://localhost:3000";

  httpHeader={
    headers:new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':`Bearer ${localStorage.getItem('Token')}`
    })
  }

  // arrAddre=[
  //   new Address(1,'1','street1','area1','city1','state1','India','12345'),
  //   new Address(2,'2','street1','area1','city1','state1','India','12345'),
  //   new Address(3,'3','street1','area1','city1','state1','India','12345')
  // ]

  // arrUser=
  // [
  //   new User(1,'John','Hugh','admin','02/03/2001','john@gmail.com','john123',this.arrAddre[0]),
  //   new User(2,'Jill','Mark','restaurant','03/03/2001','jill@gmail.com','jill123',this.arrAddre[1]),
  //   new User(3,'James','Dent','restaurant_owner','04/03/2001','james@gmail.com','james123',this.arrAddre[2])
  // ]
  constructor(private httpClient:HttpClient) 
  {

  }

  // getUsers(){
  //   return this.arrUser
  // }

  getUsersbyId(id:number):Observable<User>{
    return this.httpClient.get<User>(this.baseurl+'/users/'+id,this.httpHeader)
    .pipe(
      catchError(this.httpError)
    );
  }
  getUsersbyArea(area:string):Observable<User[]>{
    return this.httpClient.get<User[]>(this.baseurl+'/users/'+area)
    .pipe(
      catchError(this.httpError)
    );
  }

  getUsers():Observable<User[]>{
    return this.httpClient.get<User[]>(this.baseurl+'/users')
    .pipe(
      catchError(this.httpError)
    );
  }

  getToken(u:User):Observable<token>{
    return this.httpClient.post<token>(this.baseurl+'/users/login',JSON.stringify(u),this.httpHeader)
    .pipe(
      catchError(this.httpError)
    );
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

  // addUser(u:User){
  //   this.arrUser.push(u)
  //   console.log(this.arrUser)
  // }

  addUser(u:User):Observable<User>{
    return this.httpClient.post<User>(this.baseurl+'/users',JSON.stringify(u),this.httpHeader)
    .pipe(
      catchError(this.httpError)
    );
  }

  updateUser(u:User):Observable<User>{
    return this.httpClient.put<User>(this.baseurl+'/users/'+u.id,JSON.stringify(u),this.httpHeader)
    .pipe(
      catchError(this.httpError)
    );
  }

  deleteUser(id:number):Observable<User>{
    return this.httpClient.delete<User>(this.baseurl+'/users/'+id)
    .pipe(
      catchError(this.httpError)
    );
  }


}
