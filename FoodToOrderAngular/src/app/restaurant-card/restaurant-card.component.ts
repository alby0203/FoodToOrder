import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RestaurantService } from '../services/restaurant.service';
import { Router } from '@angular/router';
import { Restaurant } from '../models/restaurant';

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.scss']
})
export class RestaurantCardComponent implements OnInit {
  @Input('resta') r:Restaurant=new Restaurant(0,'','',[],[],0);
  @Output() unavail: EventEmitter<any>= new EventEmitter()
  
  role:string
  constructor(private restService:RestaurantService,private router:Router ){
    //this.unavail=new EventEmitter<number>()
    this.role=localStorage.getItem("role")+''
    
    //console.log("in constructor")
  }

  ngOnInit(): void {
    let temp=0
    this.r.dishes.forEach(e=>{
      if(e.isavailable==false)
        temp++;
    })
    this.unavail.emit({id:this.r.id,count:temp})
  }

  onClick(id:number){
    console.log(id)
    this.router.navigate(['restaurantdetails/'+id])
  }

  removeRestaurant(id:number){
    //this.restList.splice(id,1)
    //this.restService.deleteRestaurant(this.r.id).subscribe(data=>{})
    //location.reload();
  }


}
