import { Component } from '@angular/core';
import { Cart } from '../models/cart';
import { ActivatedRoute, Params } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss']
})


export class CartDetailsComponent {

  current:Cart=new Cart(0,0,[],[])

  constructor(private activatedRoute:ActivatedRoute,private cartService:CartService){
    this.activatedRoute.params.subscribe((params:Params)=>{
      let id=params['cid'];
      //this.current=cartService.getCartbyId(id)
      cartService.getCartbyId(id).subscribe(data=>{
        this.current=data
        console.log(this.current)
      })
      
    })
  }
}
