import { Component } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Address } from '../models/address';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})



export class UserDetailsComponent {
  current:User=new User(0,'','','','','','',new Address(0,'','','','','','',''))

  constructor(private httpClient:HttpClient,private activatedRoute:ActivatedRoute,private userService:UserService){
    this.activatedRoute.params.subscribe((params:Params)=>{
      let id=params['uid'];
      //this.current=userService.getUsersbyId(id)
      userService.getUsersbyId(id).subscribe(data=>{
        this.current=data
        console.log(this.current.address)
      })
    })
  }

}
