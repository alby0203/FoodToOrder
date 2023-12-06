import { Component } from '@angular/core';
import { Restaurant } from '../models/restaurant';
import { RestaurantService } from '../services/restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-owner',
  templateUrl: './restaurant-owner.component.html',
  styleUrls: ['./restaurant-owner.component.scss']
})
export class RestaurantOwnerComponent {
  role
  id
  restList:Restaurant[]=[]
  constructor(restService:RestaurantService,private router:Router){
    this.id=parseInt(localStorage.getItem("id")+'')
    restService.getRest().subscribe(data=>{
      this.restList=data
      this.restList.forEach((element,index)=>{
        if(element.ownerid!=this.id){
          this.restList.splice(index,1)
        }
      })
    })
    this.role=localStorage.getItem("role")
  }

  onClick(id:number){
    console.log(id)
    this.router.navigate(['restaurantdetails/'+id])
  }
  removeRestaurant(id:number){
    this.restList.splice(id,1)
  }
  updateRest(id:number){
    this.router.navigate(['updaterestaurant'])
  }

}
