import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Cart } from '../models/cart';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  
  cart:Cart[]=[]
  constructor(private cartService:CartService,private router:Router){
    //this.cart=cartService.getCart()
    cartService.getCart().subscribe(data=>{
      this.cart=data
    })
  }

    removeCart(i:number){
      this.cartService.deleteCart(i).subscribe(data=>{})
      location.reload();
    }

    viewCart(id:number){
      this.router.navigate(['cartdetails/'+id])
    }

}
