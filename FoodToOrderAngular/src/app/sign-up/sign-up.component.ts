import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Address } from '../models/address';
import { passwordMatch } from '../custom-validators/customValidators';
import { Cart } from '../models/cart';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  signupForm:FormGroup;
  submitted:boolean
  arrUsers:User[]=[]
  firstname:AbstractControl
  email:AbstractControl
  passwd:AbstractControl
  passwdc:AbstractControl
  dob:AbstractControl
  hno:AbstractControl
  street:AbstractControl
  area:AbstractControl
  city:AbstractControl
  state:AbstractControl
  country:AbstractControl
  pincode:AbstractControl
  currentcart:Cart



  constructor(fb:FormBuilder,private userService:UserService,private cartService:CartService){
    this.submitted=false
    this.currentcart=new Cart(0,0,[],[])
    //this.passwd=
    this.signupForm=fb.group({
      'email':["",Validators.required],
      'passwd':["",Validators.required],
      'passwdc':["",Validators.required],
      'firstname':["",Validators.required],
      'lastname':"",
      'dob':["",Validators.required],
      'hno':["",Validators.required],
      'street':["",Validators.required],
      'area':["",Validators.required],
      'city':["",Validators.required],
      'state':["",Validators.required],
      'country':["",Validators.required],
      'pincode':["",Validators.required],

    },
    {
      validator: passwordMatch('passwd','passwdc')
    }
    );
    userService.getUsers().subscribe(data=>{
      this.arrUsers=data
    })
    this.firstname=this.signupForm.controls['firstname']
    this.dob=this.signupForm.controls['dob']
    this.email=this.signupForm.controls['email']
    this.passwd=this.signupForm.controls['passwd']
    this.passwdc=this.signupForm.controls['passwdc']
    this.hno=this.signupForm.controls['hno']
    this.street=this.signupForm.controls['street']
    this.area=this.signupForm.controls['area']
    this.city=this.signupForm.controls['city']
    this.state=this.signupForm.controls['state']
    this.country=this.signupForm.controls['country']
    this.pincode=this.signupForm.controls['pincode']


  }

  onSubmit(value:string): void{
    
    
    this.submitted=true;
    console.log(this.passwdc.errors)
    if(this.signupForm.invalid)
    return;
    console.log("Submitted value:",value)

    
    var tempId=0;
    var maxId=0;

    this.arrUsers.forEach(u=>{
      if(maxId<u.id){
        maxId=u.id;
      }
    })
    tempId=maxId+1;

    let fn=this.signupForm.value.firstname;
    let ln=this.signupForm.value.lastname;
    let em=this.signupForm.value.email;
    let pd=this.signupForm.value.passwd;
    let d=this.signupForm.value.dob;
    let house=this.signupForm.value.hno;
    let st=this.signupForm.value.street;
    let ar=this.signupForm.value.area;
    let ct=this.signupForm.value.city;
    let sta=this.signupForm.value.state;
    let cn=this.signupForm.value.country;
    let pin=this.signupForm.value.pincode;

    var tempAddr=new Address(1,house,st,ar,ct,sta,cn,pin);
    if(fn!=null&&ln!=null&&em!=null&&pd!=null&&d!=null){
      var tempUser=new User(tempId,fn,ln,'user',d,em,pd,tempAddr);
      console.log(tempUser)

      this.userService.addUser(tempUser).subscribe(data=>{
        //console.log()
        this.currentcart=new Cart(parseInt(data.id+''),0,[],[])
        this.cartService.addCart(this.currentcart).subscribe(data=>{})
      });
      location.reload()
    }
    

  }

}
