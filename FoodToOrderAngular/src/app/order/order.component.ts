import { Component } from '@angular/core';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {

  orders:Order[]=[]
  constructor(private orderService:OrderService,private router:Router){
    orderService.getOrders().subscribe(data=>{
      this.orders=data
    })
  }

  removeOrder(i:number){
    //this.orders.splice(i,1)
    this.orderService.deleteOrder(i).subscribe(data=>{})
    location.reload();
  }

  viewOrder(id:number){
    this.router.navigate(['orderdetails/'+id])
  }

}
