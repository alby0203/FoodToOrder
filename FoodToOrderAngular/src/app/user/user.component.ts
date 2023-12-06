import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() userName:string="initial"
  arrUser:User[]=[]

  constructor(private userService:UserService,private router:Router){
    userService.getUsers().subscribe(data=>{
      this.arrUser=data
    })
  }


  ngOnInit(): void {
    console.log(this.userName)
  }

  removeUser(id:number){
    // this.userService.deleteUser(id).subscribe(data=>{})
    // location.reload();
  }
  viewUser(id:number){
    this.router.navigate(['userdetails/'+id])
  }

}
