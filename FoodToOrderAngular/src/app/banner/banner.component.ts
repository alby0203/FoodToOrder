import { Component } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Cart } from '../models/cart';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestaurantService } from '../services/restaurant.service';
import { Restaurant } from '../models/restaurant';
import { Dish } from '../models/dish';
import { Observable, interval, map, take } from 'rxjs';
import { formatDate } from '@angular/common';
import { token } from '../models/token';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent {

  signinform:FormGroup
  arrUser:User[]=[]
  arrDishes$:Observable<string> | undefined
  arrDish:Dish[]=[]
  arrRest:Restaurant[]=[]
  current_role:any
  arrOrders:Order[]=[]
  currentcart:Cart=new Cart(0,0,[],[])
  searchForm:FormGroup
  searchkey:AbstractControl

  constructor(fb:FormBuilder,private userService:UserService,private cartService:CartService,private orderService:OrderService,private restService:RestaurantService){
    userService.getUsers().subscribe(data=>{
      this.arrUser=data
      console.log(this.arrUser);
    })
    restService.getRest().subscribe(data=>{
      this.arrRest=data
      this.arrRest.forEach(element => {
        element.dishes.forEach(e=>{
          this.arrDish.push(e)
        })
      });
      this.arrDishes$=this.getResendObservable()
      console.log(this.arrDishes$)
    })

    this.searchForm=fb.group({
      'searchkey':["",Validators.required]
    })
    this.searchkey=this.searchForm.controls['searchkey']

    orderService.getOrders().subscribe(data=>{
      this.arrOrders=data
    })
    //localStorage.setItem('role','invalid credentials')
    this.current_role=localStorage.getItem('role');
    console.log(this.current_role)
    this.signinform=fb.group({
      'useremail':["",Validators.required],
      'userpassword':["",Validators.required]
    })

  }

  searchSubmit(val:string){
    console.log(val)
    this.arrDishes$=this.getResendObservable()
  }

  private getResendObservable() {
    return interval(1000).pipe(
      map(i => this.arrDish[i].name),
      take(this.arrDish.length)
    );
  }
  get controls(){
    return this.signinform.controls
  }
    verifyCredentials(value:string){
      let flag=0
      for (let index = 0; index < this.arrUser.length; index++) {
        console.log(this.signinform.value.useremail,this.arrUser[index].email,this.signinform.value.userpassword,this.arrUser[index].password)
        if(this.signinform.value.useremail==this.arrUser[index].email&&this.signinform.value.userpassword==this.arrUser[index].password){
          console.log("in if");
          localStorage.setItem('role',this.arrUser[index].role)
          localStorage.setItem('id',this.arrUser[index].id.toString())
          localStorage.setItem('owner',this.arrUser[index].id.toString())
          this.userService.getToken(this.arrUser[index]).subscribe(data=>{
            console.log(data.t)
            localStorage.setItem("Token",data.t)
            flag=1
          })
          flag=1
          break
        }
      }
      if(flag==0){
        localStorage.setItem('role','invalid credentials')
        localStorage.setItem('id','0')
      }
      
      
      localStorage.setItem('owner','')
      this.current_role=localStorage.getItem('role');
      location.reload()
    }

    setCart(){
      let id=parseInt(localStorage.getItem('id')+'')
      this.cartService.getCartbyId(id).subscribe(data=>{
        this.currentcart=data
        console.log(this.currentcart)
      },
      error=>{
        this.currentcart=new Cart(id,0,[],[])
        this.cartService.addCart(this.currentcart).subscribe(data=>{})
      })
    }

    decreaseCount(index:number){
      this.currentcart.count[index]--;
      this.currentcart.amount-=this.currentcart.dishes[index].price
      if(this.currentcart.count[index]==0){
        this.currentcart.dishes.splice(index,1)
        this.currentcart.count.splice(index,1)
      }
      
      this.cartService.updatecart(this.currentcart).subscribe(data=>{})
    }

    increaseCount(index:number){
      this.currentcart.count[index]++;
      this.currentcart.amount+=this.currentcart.dishes[index].price      
      this.cartService.updatecart(this.currentcart).subscribe(data=>{})
    }

    clearCart(){
      this.currentcart.dishes.splice(0,this.currentcart.dishes.length)
      this.currentcart.count.splice(0,this.currentcart.count.length)
      this.currentcart.amount=0
      this.cartService.deleteCart(this.currentcart.id).subscribe(data=>{})
    }

    placeOrder(){
      this.orderService.getOrders().subscribe(data=>{
        this.arrOrders=data
      })
      var tempId=0
      this.arrOrders.forEach(e=>{
        if(e.id>tempId)
          tempId=e.id
      })
      tempId++
      console.log(tempId)
      let dateTime = formatDate(new Date(),'yyyy-MM-dd','en-US')
      let id=parseInt(localStorage.getItem('id')+'')
      //console.log(formatDate(dateTime,'yyyy-MM-dd','en-US'))
      let currentOrder = new Order(tempId,dateTime,this.currentcart.amount,id,this.currentcart.dishes,this.currentcart.count)
      this.orderService.addOrder(currentOrder).subscribe(data=>{})
      this.currentcart=new Cart(id,0,[],[])
      this.cartService.deleteCart(this.currentcart.id).subscribe(data=>{})
    }
    
    signOut(){
      //localStorage.clear();
      localStorage.setItem('role','invalid credentials')
      localStorage.setItem('id','0')
      location.reload()
    }
    
}
