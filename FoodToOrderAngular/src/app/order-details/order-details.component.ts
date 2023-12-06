import { Component } from '@angular/core';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Cart } from '../models/cart';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent {

  current:Order=new Order(0,'',0,0,[],[])

  constructor(private orderService:OrderService,private activatedRoute:ActivatedRoute){
    this.activatedRoute.params.subscribe((params:Params)=>{
      let id=params['oid'];
      //this.current=orderService.getOrderbyId(id)
      orderService.getOrderbyId(id).subscribe(data=>{
        this.current=data
      })
    })
  }

}
