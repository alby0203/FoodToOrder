import { Directive, HostListener, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponentComponent } from './dialog-component/dialog-component.component';
import { UserService } from './services/user.service';
import { RestaurantService } from './services/restaurant.service';

@Directive({
  selector: '[appDeleteUser]'
})
export class DeleteUserDirective {

  resultexp:string=''
  @Input('appDeleteUser') userid:number=0
  @Input() type:string="";
  constructor(private userService:UserService,private restService:RestaurantService,public dialog: MatDialog) { }

  @HostListener('click') onClick() {
    console.log("bla bla",this.userid)
    const dialogRef = this.dialog.open(DialogComponentComponent,{data: {type:this.type,id:this.userid},});
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.resultexp = result;
      console.log(this.resultexp)
      
      if(this.type=="user"&&this.resultexp=="delete"){
        this.userService.deleteUser(this.userid).subscribe(data=>{})
        location.reload();
      }
      else if(this.type=="restaurant"&&this.resultexp=="delete"){
        this.restService.deleteRestaurant(this.userid).subscribe(data=>{})
        location.reload();
      }


    });
  }


}
