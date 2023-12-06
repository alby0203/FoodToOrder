import { CanActivateFn } from "@angular/router";

export function adminGuard():CanActivateFn{
    let role = localStorage.getItem('role')
    return()=>{
        if(role=='admin')
            return true;
    alert("No access, You are a "+role)
        return false;
    };
}