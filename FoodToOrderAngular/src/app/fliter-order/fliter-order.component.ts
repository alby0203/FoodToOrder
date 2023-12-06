import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from '../models/order';

@Component({
  selector: 'app-fliter-order',
  templateUrl: './fliter-order.component.html',
  styleUrls: ['./fliter-order.component.scss']
})
export class FliterOrderComponent {
  
  filterOrder:FormGroup
  orderList:Order[]=[]
  startdate:AbstractControl
  enddate:AbstractControl
  
  constructor(fb:FormBuilder,private orderService:OrderService){
    this.filterOrder=fb.group({
      'startdate':["",Validators.required],
      'enddate':["",Validators.required]
    })
    this.startdate=this.filterOrder.controls['startdate']
    this.enddate=this.filterOrder.controls['enddate']

  }

  onSubmit(value:string){
    this.orderList=this.orderService.filterOrder(this.filterOrder.value.startdate,this.filterOrder.value.enddate)
    console.log(this.orderList)
  }

}
