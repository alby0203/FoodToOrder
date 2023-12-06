import { Component } from '@angular/core';
import { Address } from '../models/address';
import { User } from '../models/user';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent {
  signupForm:FormGroup;
  submitted:any
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
  id:AbstractControl
  idUpdated:number
  current:any
  aid:any

  constructor(fb:FormBuilder,private userService:UserService){
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
      'id':["",Validators.required],

    })
    this.idUpdated=-1
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
    this.id=this.signupForm.controls['id']


  }

  onChangeType(evt:any):void{
    console.log(evt.target.value)
    var idObtained=evt.target.value;
    this.idUpdated=parseInt(idObtained.split(':')[1].trim());

    this.userService.getUsersbyId(this.idUpdated).subscribe(data=>{
      this.current=data
      console.log(this.current)
      this.aid=this.current.address.id
      this.signupForm.get('firstname')?.setValue(this.current.firstName)
    this.signupForm.get('lastname')?.setValue(this.current.lastName)
    this.signupForm.get('dob')?.setValue(this.current.dob)
    this.signupForm.get('hno')?.setValue(this.current.address.houseno)
    this.signupForm.get('street')?.setValue(this.current.address.street)
    this.signupForm.get('area')?.setValue(this.current.address.area)
    this.signupForm.get('city')?.setValue(this.current.address.city)
    this.signupForm.get('state')?.setValue(this.current.address.state)
    this.signupForm.get('country')?.setValue(this.current.address.country)
    this.signupForm.get('pincode')?.setValue(this.current.address.pincode)
    this.signupForm.get('email')?.setValue(this.current.email)
    })
  }

  
  onSubmit(value:string): void{

    if(this.signupForm.invalid)
    return;
    console.log("Submitted value:",value)

    this.submitted=true;
    var tempId=0;
 
    tempId=this.idUpdated;
    

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

    var tempAddr=new Address(this.aid,house,st,ar,ct,sta,cn,pin);
    if(fn!=null&&ln!=null&&em!=null&&pd!=null&&d!=null){
      var tempUser=new User(tempId,fn,ln,'user',d,em,pd,tempAddr);

      this.userService.updateUser(tempUser).subscribe(data=>{});
      location.reload()

    }
    

  }
}
