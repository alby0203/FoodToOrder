import { Component } from '@angular/core';
import { Observable, filter, interval, map, take } from 'rxjs';
import { Dish } from '../models/dish';
import { RestaurantService } from '../services/restaurant.service';
import { Restaurant } from '../models/restaurant';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  arrDishes$:Observable<Dish[]>= new Observable<Dish[]>()
  arrDish:Dish[]=[]
  arrRest:Restaurant[]=[]
  arrRestmain:Restaurant[]=[]
  searchForm:FormGroup
  searchkey:AbstractControl

  constructor(fb:FormBuilder,private restService:RestaurantService,private router:Router ){
    restService.getRest().subscribe(data=>{
      this.arrRest=data
      this.arrRestmain=this.arrRest.splice(0,2)
      this.arrRest.forEach(element => {
        element.dishes.forEach(e=>{
          this.arrDish.push(e)
        })
      });
      //this.arrDishes$=this.getResendObservable()
      //console.log(this.arrDishes$)
    })
    this.searchForm=fb.group({
      'searchkey':["",Validators.required]
    })
    this.searchkey=this.searchForm.controls['searchkey']
  }

  resend() {
   
    let matchingDish = this.arrDish.filter(dish => dish.name.toLowerCase().includes(this.searchForm.value.searchkey.toLowerCase()))
    this.arrDishes$ = interval(1000).pipe(
      map(i => matchingDish),
      take(matchingDish.length)
    );
    console.log(this.arrDishes$)
  }

  private getResendObservable() {
    console.log(this.arrDish)
    return interval(1).pipe(
      map(i => this.arrDish[i].name),
      filter(i=>i.startsWith(this.searchForm.value.searchkey)),
      take(this.arrDish.length)
    );
  }

  mainRestPage(){
    //this.router.navigate('/restaurants')
  }

}
