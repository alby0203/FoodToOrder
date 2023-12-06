import { Component } from '@angular/core';
import { User } from '../models/user';
import { Restaurant } from '../models/restaurant';
import { Address } from '../models/address';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {
  // testVal="I am the test value in a variable."    
  // arrUser = [
  //   [1,'John','Hugh','02/03/2001','john@gmail.com','Blr'],
  //   [2,'Jill','Mark','03/03/2001','jill@gmail.com','Blr'],
  //   [3,'James','Dent','04/03/2001','james@gmail.com','Blr']
  // ]

  // isValidVoter(nm:string){
  //   if(nm=='Jill'){
  //     return true
  //   }
  //   else
  //     return false
  // }
  

  add1=
  [
    new Address(1,'10','street1','area1','city1','state1','country1','12345'),
    new Address(2,'11','street2','area1','city1','state1','country1','12345')
  ]
  add2=
  [
    new Address(1,'20','street1','area1','city1','state1','country1','12345'),
    new Address(1,'21','street2','area1','city1','state1','country1','12345')
  ]


  choice:number =1;
  onClick(){
    this.choice=(this.choice+1)%5
  }

}
