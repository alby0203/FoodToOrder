import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Order } from '../models/order';
import { Cart } from '../models/cart';

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.scss']
})
export class UpdateOrderComponent {


  firstFormGroup: FormGroup
  isLinear=false
  public dishesForm: FormGroup

  idUpdated:number

  arrOrder:Order[]=[]
  current:Order=new Order(0,'',0,0,[],[])

  constructor(fb: FormBuilder,private orderService:OrderService){
    orderService.getOrders().subscribe(data=>{this.arrOrder=data})


    this.idUpdated=0

    this.firstFormGroup = fb.group({
      uid: ['', Validators.required],
      oid: ['', Validators.required],
      dt: ['', Validators.required],
    });
    this.dishesForm = fb.group({
      form_array_dishes: fb.array([])
    })

  }

  form_array_dishes(): FormArray {
    return this.dishesForm.get("form_array_dishes") as FormArray;
  }
  private createDishFormGroup(): FormGroup {
    return new FormGroup({
      'quantity': new FormControl('', Validators.required),
      'name': new FormControl('', Validators.required),
      'price': new FormControl('', Validators.required)
    })
  }
  
  onChangeType(evt: any): void{
    var idObtained = evt.target.value;
    this.idUpdated = parseInt(idObtained.split(':')[1].trim());
    this.orderService.getOrderbyId(this.idUpdated).subscribe(data=>{
      this.current=data
      this.firstFormGroup.get('oid')?.setValue(this.current.id)
      this.firstFormGroup.get('uid')?.setValue(this.current.userid)
      this.firstFormGroup.get('dt')?.setValue(this.current.date)

      const form_array_dishes = this.dishesForm.get('form_array_dishes') as FormArray
      form_array_dishes.clear()

      this.current.dishes.forEach((element,i)=>{
        let tempForm = this.createDishFormGroup()
        tempForm.get('quantity')?.setValue(this.current.count[i])
        tempForm.get('name')?.setValue(element.name)
        tempForm.get('price')?.setValue(element.price)
        form_array_dishes.push(tempForm)
      })

    })

  }

  saveFirstStepData(formdata:FormGroup){

  }
  saveThirdStepData(formdata:FormGroup){
    let dishArr = Object.values(formdata);
    let temp = JSON.parse(JSON.stringify(dishArr));
    this.current.count.forEach((element,index)=>{
      this.current.count[index]=parseInt(temp[0][index].quantity+'')
    })
    this.current.amount=this.getTotal()
    this.current.amount=this.current.amount
    this.orderService.updateOrder(this.current).subscribe(data=>{})
    console.log(this.current)
  }

  getTotal():number{
    let tempamount=0
    this.current.dishes.forEach((element,i)=>{
      tempamount+=element.price*this.current.count[i]
    })
    return tempamount
  }

}
