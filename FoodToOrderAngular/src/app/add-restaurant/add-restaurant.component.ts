import {Component} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormControl, FormArray} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { Restaurant } from '../models/restaurant';
import { Address } from '../models/address';
import { RestaurantService } from '../services/restaurant.service';
import { Dish } from '../models/dish';
import { UserService } from '../services/user.service';
import { User } from '../models/user';


@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.scss'],

})
export class AddRestaurantComponent {
  count:number
  dcount:number
  arrRestaurants:Restaurant[]=[]
  arrUsers:User[]=[]
  addresses: Address[] = [];
  dishes:Dish[]=[]
  public addressForm:FormGroup
  public dishesForm:FormGroup
  countSecondFormSubmit:number
  countThirdFormSubmit:number
  restaurant:Restaurant=new Restaurant(0,'','',[],[],0)

  firstFormGroup = this._formBuilder.group({
    firstCtrlname: ['', Validators.required],
    firstCtrlimage: ['', Validators.required],
    owner:['', Validators.required]
  });
  isLinear = false;

  constructor(private _formBuilder: FormBuilder,private restService:RestaurantService,private userService:UserService) {
    restService.getRest().subscribe(data=>{
      this.arrRestaurants=data
      
    })
    userService.getUsers().subscribe(data=>{
      this.arrUsers=data.filter(d=>d.role=='restaurant_owner')
      
    })
    this.count=0;
    this.dcount=0;
    this.countSecondFormSubmit=0
    this.countThirdFormSubmit=0
    this.addressForm=this._formBuilder.group({
      form_array_addresses:this._formBuilder.array([this.createAddressFormGroup()])
    })
    this.dishesForm=this._formBuilder.group({
      form_array_dishes:this._formBuilder.array([this.createDishFormGroup()])
    })

  }

  form_array_addresses():FormArray{
    return this.addressForm.get("form_array_addresses")as FormArray;
  }

  form_array_dishes():FormArray{
    return this.dishesForm.get("form_array_dishes")as FormArray;
  }


  saveSecondStepData(formdata: FormGroup) {
    this.countSecondFormSubmit++;
    if (this.countSecondFormSubmit == this.count) {
      // this.addresses=Object.values(formdata);
      // console.log(formdata);
      let adressArr = Object.values(formdata);
      let count = 1;
      adressArr.forEach((a) => {        
        // a.id=i+1
        // let tempAct: string[] = [];
        // tempAct = Object.values(a[0]);
        // let tempActArr: string[] = [];
        // tempActArr = Object.values(tempAct[2]);
        // tempActArr.forEach((act: any) => { })
      });
      this.addresses = adressArr;
                    
      let temp = JSON.parse(JSON.stringify(this.addresses));
      this.restaurant.addresses = temp[0];
      // this.restaurant.addresses.forEach((a,i)=>{
      //   //a.id=i+1
      // })
      this.restaurant.addresses.forEach((a,i)=>{
        a.id=i+1
      })
      console.log(this.restaurant.addresses);
      
      //this.restService.addRestaurant(this.restaurant)
      //alert("Supplier added Succesfully")
      console.log(this.restaurant)

    }
  }

  saveThirdStepData(formdata:FormGroup){
    this.countThirdFormSubmit++;
    if (this.countThirdFormSubmit == this.count) {
      let dishArr = Object.values(formdata);
      this.dishes=dishArr;
      let temp = JSON.parse(JSON.stringify(this.dishes));
      this.restaurant.dishes = temp[0];
      this.restaurant.dishes.forEach((element,i) => {
        element.isavailable=true;
        element.id=i+1
      });
      this.restService.addRestaurant(this.restaurant).subscribe(data=>{})
      console.log(this.restaurant)
      //location.reload()

    }
  }

  public addAddressFormGroup() {
    const form_array_addresses = this.addressForm.get('form_array_addresses') as FormArray
    form_array_addresses.push(this.createAddressFormGroup())
  }

  public addDishFormGroup() {
    const form_array_dishes = this.dishesForm.get('form_array_dishes') as FormArray
    form_array_dishes.push(this.createDishFormGroup())
  }

  public removeOrClearAddress(i: number) {
    const form_array_addresses = this.addressForm.get('form_array_addresses') as FormArray
    if (form_array_addresses.length > 1) {
      form_array_addresses.removeAt(i)
    }
    else {
      form_array_addresses.reset()
    }
  }
  public removeOrClearDish(i: number) {
    const form_array_dishes = this.dishesForm.get('form_array_dishes') as FormArray
    if (form_array_dishes.length > 1) {
      form_array_dishes.removeAt(i)
    }
    else {
      form_array_dishes.reset()
    }
  }

  saveFirstStepData(formData:FormGroup){
    let tempId=0;
    let maxId=0;
    this.arrRestaurants.forEach(r=>{
      if(maxId<r.id)
        maxId=r.id;
    })
    tempId=maxId+1
    console.log(formData);
    this.restaurant.id=tempId
    this.restaurant.name=formData.value['firstCtrlname']
    this.restaurant.image=formData.value['firstCtrlimage']
    this.restaurant.ownerid=formData.value['owner']
    console.log(this.restaurant)

  }

  private createAddressFormGroup():FormGroup{
      this.count++;
      return new FormGroup({
        'id': new FormControl('',Validators.required),
        'houseno':new FormControl('',Validators.required),
        'street': new FormControl('',Validators.required),
        'area':new FormControl('',Validators.required),
        'city': new FormControl('',Validators.required),
        'state':new FormControl('',Validators.required),
        'country': new FormControl('',Validators.required),
        'pincode':new FormControl('',Validators.required)
      })
  }

  private createDishFormGroup():FormGroup{
    this.dcount++;
    return new FormGroup({
      'id': new FormControl('',Validators.required),
      'image':new FormControl('',Validators.required),
      'name': new FormControl('',Validators.required),
      'price':new FormControl('',Validators.required)
    })
}


}
