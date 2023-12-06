import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordMatch(passwdname:string,passwdcname:string){
    return (form:FormGroup)=>{
       const passwd=form.controls[passwdname]
       const passwdc=form.controls[passwdcname]

        if(passwd.value!=passwdc.value){
            passwdc.setErrors({'noMatch':true})
        }
        else{
            passwdc.setErrors(null)
        }

      } 
}