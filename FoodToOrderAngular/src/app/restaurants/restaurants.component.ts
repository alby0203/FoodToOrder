import { Component, Input } from '@angular/core';
import { Restaurant } from '../models/restaurant';
import { Address } from '../models/address';
import { RestaurantService } from '../services/restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent {
  @Input() restDetails:Restaurant=new Restaurant(0,'','',[],[],0) 


  role
  
  restList:Restaurant[]=[]
  countunavail:number[]=[]
  currentItemsToShow:Restaurant[]=[]

  constructor(private restService:RestaurantService,private router:Router ){
    
    restService.getRest().subscribe(data=>{
      this.restList=data
      this.currentItemsToShow=this.restList.slice(0,2)
      
    })
    this.role=localStorage.getItem("role")
  }

  setAvailable(evt:any,i:number){
    //console.log(evt)
    this.countunavail[i]=evt.count
    //console.log(this.countunavail)
  }

  onClick(id:number){
    console.log(id)
    this.router.navigate(['restaurantdetails/'+id])
  }

  removeRestaurant(id:number){
    //this.restList.splice(id,1)
    this.restService.deleteRestaurant(this.restList[id].id).subscribe(data=>{})
    location.reload();
  }

  onPageChange(evt:any) {
    this.currentItemsToShow =  this.restList.slice(evt.pageIndex*evt.pageSize, evt.pageIndex*evt.pageSize + evt.pageSize);
  }


}
