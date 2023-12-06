import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {
  myform:FormGroup;
  submitted:boolean=false
  name:AbstractControl
  email:AbstractControl
  mobile:AbstractControl
  details:AbstractControl

  constructor(fb:FormBuilder){
    this.myform=fb.group({
      'name':["",Validators.required],
      'email':["",Validators.required],
      'mobile':["",Validators.required],
      'details':["",Validators.required],
    })

    this.name=this.myform.controls['name']
    this.email=this.myform.controls['email']
    this.mobile=this.myform.controls['mobile']
    this.details=this.myform.controls['details']
  }
  onSubmit(){
    this.submitted=true
  }

}
