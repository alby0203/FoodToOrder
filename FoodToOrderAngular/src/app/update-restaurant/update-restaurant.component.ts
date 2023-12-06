import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RestaurantService } from '../services/restaurant.service';
import { Restaurant } from '../models/restaurant';
import { Address } from '../models/address';
import { Dish } from '../models/dish';

@Component({
  selector: 'app-update-restaurant',
  templateUrl: './update-restaurant.component.html',
  styleUrls: ['./update-restaurant.component.scss']
})



export class UpdateRestaurantComponent {
  arrRest: Restaurant[] = []
  firstFormGroup: FormGroup
  public addressForm: FormGroup
  public dishesForm: FormGroup
  isLinear = false;
  current: Restaurant = new Restaurant(0, '', '', [], [], 0)
  addresses: Address[] = [];
  dishes: Dish[] = []
  newRest: Restaurant = new Restaurant(0, '', '', [], [], 0)

  idUpdated: number
  count: number
  dcount: number
  countSecondFormSubmit: number
  countThirdFormSubmit: number
  id
  role
  owner:any

  constructor(fb: FormBuilder, private restService: RestaurantService) {

    this.count = 0
    this.dcount = 0;
    this.countSecondFormSubmit = 0;
    this.countThirdFormSubmit = 0
    this.role=localStorage.getItem("role")
    this.id=parseInt(localStorage.getItem("id")+'')
    restService.getRest().subscribe(data => {
      this.arrRest = data
      if(this.role=="restaurant_owner"){
        this.arrRest.forEach((element,index)=>{
          if(element.ownerid!=this.id){
            this.arrRest.splice(index,1)
          }
        })
      }
    })

    this.firstFormGroup = fb.group({
      rest_id: ['', Validators.required],
      firstCtrlname: ['', Validators.required],
      firstCtrlimage: ['', Validators.required],
    });

    this.addressForm = fb.group({
      form_array_addresses: fb.array([])
    })
    this.dishesForm = fb.group({
      form_array_dishes: fb.array([])
    })

    this.idUpdated = 0
  }
  form_array_addresses(): FormArray {
    return this.addressForm.get("form_array_addresses") as FormArray;
  }

  form_array_dishes(): FormArray {
    return this.dishesForm.get("form_array_dishes") as FormArray;
  }

  private createAddressFormGroup(): FormGroup {
    this.count++;
    return new FormGroup({
      'id': new FormControl(0, Validators.required),
      'houseno': new FormControl('', Validators.required),
      'street': new FormControl('', Validators.required),
      'area': new FormControl('', Validators.required),
      'city': new FormControl('', Validators.required),
      'state': new FormControl('', Validators.required),
      'country': new FormControl('', Validators.required),
      'pincode': new FormControl('', Validators.required)
    })
  }

  private createDishFormGroup(): FormGroup {
    this.dcount++;
    console.log(this.countThirdFormSubmit,this.dcount)
    return new FormGroup({
      'id': new FormControl(0, Validators.required),
      'image': new FormControl('', Validators.required),
      'name': new FormControl('', Validators.required),
      'price': new FormControl('', Validators.required),
      'isavailable': new FormControl(true, Validators.required)
    })
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

  onChangeType(evt: any): void {
    this.dcount=0
    var idObtained = evt.target.value;
    this.idUpdated = parseInt(idObtained.split(':')[1].trim());
    this.restService.getRestById(this.idUpdated).subscribe(data => {
      this.current = data
      console.log(this.current)
      this.owner=this.current.ownerid
      this.firstFormGroup.get('firstCtrlname')?.setValue(this.current.name)
      this.firstFormGroup.get('firstCtrlimage')?.setValue(this.current.image)
      const form_array_addresses = this.addressForm.get('form_array_addresses') as FormArray
      form_array_addresses.clear()
      //this.addressForm.reset()
      this.countThirdFormSubmit=this.current.dishes.length-1;
      //console.log(this.countThirdFormSubmit,this.dcount)
      this.current.addresses.forEach(element => {

        let tempForm = this.createAddressFormGroup()
        tempForm.get('id')?.setValue(element.id)
        tempForm.get('houseno')?.setValue(element.houseno)
        tempForm.get('street')?.setValue(element.street)
        tempForm.get('area')?.setValue(element.area)
        tempForm.get('city')?.setValue(element.city)
        tempForm.get('state')?.setValue(element.state)
        tempForm.get('country')?.setValue(element.country)
        tempForm.get('pincode')?.setValue(element.pincode)
        form_array_addresses.push(tempForm)
      });
      const form_array_dishes = this.dishesForm.get('form_array_dishes') as FormArray
      form_array_dishes.clear()
      this.current.dishes.forEach(element=>{
        let tempForm = this.createDishFormGroup()
          tempForm.get('id')?.setValue(element.id)
          tempForm.get('image')?.setValue(element.image)
          tempForm.get('name')?.setValue(element.name)
          tempForm.get('price')?.setValue(element.price)
          tempForm.get('isavailable')?.setValue(element.isavailable)
          form_array_dishes.push(tempForm)
      });
    })
  }

  changefunc(evt:any){
    console.log()
    // var idObtained = evt.target.value;
    // var dishId = parseInt(idObtained.split(':')[1].trim());
    //console.log(dishId)
  }

  saveFirstStepData(formdata: FormGroup) {
    this.newRest.id = this.current.id
    console.log(this.current)
    this.newRest.ownerid=this.current.ownerid
    console.log(this.newRest)
    this.newRest.name = formdata.value['firstCtrlname']
    this.newRest.image = formdata.value['firstCtrlimage']
  }
  saveSecondStepData(formdata: FormGroup) {
    let adressArr = Object.values(formdata);
    this.addresses = adressArr;
    let temp = JSON.parse(JSON.stringify(this.addresses));
    this.newRest.addresses = temp[0]
    // this.newRest.addresses.forEach((a, i) => {
    //   a.id = i + 1
    // })
    console.log(this.newRest)
  }
  saveThirdStepData(formdata: FormGroup) {
    this.countThirdFormSubmit++;
    //console.log(this.countThirdFormSubmit,this.dcount)
    //console.log(formdata)
    if (this.countThirdFormSubmit == this.dcount){
      let dishArr = Object.values(formdata);
      this.dishes=dishArr;
      let temp = JSON.parse(JSON.stringify(this.dishes));
      //console.log(temp[0])
      this.newRest.dishes = temp[0];
      // this.newRest.dishes.forEach((element,i) => {
      //   //element.isavailable=true;
      //   element.id=i+1
      // });
      console.log(this.newRest)
      this.restService.updateRestaurant(this.newRest).subscribe(data=>{})
    }
    
  }

} 
