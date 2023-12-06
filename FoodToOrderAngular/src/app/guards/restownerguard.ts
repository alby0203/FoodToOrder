import { CanActivateFn } from "@angular/router";

export function restowner():CanActivateFn{
    let role=localStorage.getItem('role')
   return()=>{
    if(role=='restaurant_owner')
        return true;
    alert("No access, You are a "+role)
        return false;
   }

}