import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-filter-user',
  templateUrl: './filter-user.component.html',
  styleUrls: ['./filter-user.component.scss']
})
export class FilterUserComponent {

  filterUser:FormGroup
  userList:User[]=[]
  area:AbstractControl
  
  constructor(fb:FormBuilder,private userService:UserService){
    this.filterUser=fb.group({
      'area':["",Validators.required]
      
    })
    this.area=this.filterUser.controls['area']
  }

  onSubmit(value:string){
    this.userService.getUsersbyArea(this.filterUser.value.area).subscribe(data=>{
      this.userList=data
      //this.userList=this.userList.filter(x=>x.address.area==this.filterUser.value.area)
    })
    console.log(this.userList)
  }
}
