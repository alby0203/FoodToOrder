import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RestaurantService } from '../services/restaurant.service';
import { Restaurant } from '../models/restaurant';
import { CartService } from '../services/cart.service';
import { Cart } from '../models/cart';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.scss']
})
export class RestaurantDetailsComponent {

  current_role:any
  currentcart:Cart=new Cart(0,0,[],[])
  current:Restaurant=new Restaurant(0,'','',[],[],0)
  constructor(private activatedRoute:ActivatedRoute,private dishService:DishService,private restService:RestaurantService,private cartService:CartService)
  {
    this.current_role=localStorage.getItem('role');
    this.activatedRoute.params.subscribe((params:Params)=>{
      let id=params['rid'];
      console.log('restaurant details for:'+id);
      //this.current=restService.getRestById(id)
      this.restService.getRestById(id).subscribe(data=>{
        this.current=data
        this.current.dishes.forEach(element => {
          console.log(element.isavailable);
          
        });
      })
    })
  }

  addToCart(dishid:number){
    let id=parseInt(localStorage.getItem('id')+'')
      this.cartService.getCartbyId(id).subscribe(data=>{
        this.currentcart=data
        console.log(this.currentcart)
      let flag=0;
      let currentcartdishes=this.currentcart.dishes
      let currentrestdishes=this.current.dishes
      //let currentdish = this.dishService
      // for(var i=0;i<currentcartdishes.length;i++){
      //   if(currentrestdishes[dishid].id==currentcartdishes[i].id&&currentrestdishes[dishid].name==currentcartdishes[i].name&&currentrestdishes[dishid].price==currentcartdishes[i].price)
      //   {
      //     flag=1;
      //     this.currentcart.count[i]++
      //     break
      //   }
      // }
      var result=0
      for(var i=0;i<currentcartdishes.length;i++){
        if(currentcartdishes[i].id==dishid)
          result =1;
      }
      //let result = currentcartdishes.filter(x=>x.id=dishid)
      console.log(result,dishid);
      if(result==1){
        for(var i=0;i<currentcartdishes.length;i++){
          if(currentcartdishes[i].id==dishid){
            this.currentcart.count[i]++;
            this.currentcart.amount+=currentcartdishes[i].price
          }
        }
      }
      else{
        for(var i=0;i<currentrestdishes.length;i++){
          var flagg=0
          if(currentrestdishes[i].id==dishid){
            var ind=-1
            for(var j=0;j<this.currentcart.dishes.length;j++){
              if(dishid<=this.currentcart.dishes[j].id){
                ind=j
                console.log(ind+"hi")
                break
                
              }
            }
              this.currentcart.dishes.splice(ind,0,currentrestdishes[i])
              this.currentcart.count.splice(ind,0,1)
              //this.currentcart.dishes.push(currentrestdishes[i])
              //this.currentcart.count.push(1)
              this.currentcart.amount+=currentrestdishes[i].price
              break
          }
        }
      }
      // if(flag==0){
      //   this.currentcart.dishes.push(this.current.dishes[dishid])
      // this.currentcart.count.push(1)
      // }
      //this.currentcart.amount+=this.current.dishes[dishid].price

      console.log(this.currentcart)
      this.cartService.updatecart(this.currentcart).subscribe(data=>{})

      },
      error=>{
        this.currentcart=new Cart(id,0,[],[])
        this.cartService.addCart(this.currentcart).subscribe(data=>{})
      })
      
  }

}
