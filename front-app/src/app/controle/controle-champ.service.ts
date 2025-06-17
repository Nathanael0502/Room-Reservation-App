import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ControleChampService {

  constructor() { }
  requireMail(email:string){
    let emailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if(!emailRegex.test(email)){

      
    }
    return emailRegex.test(email);
  }

  requireChamp(text:string){
    let regex=/[^0-9]/g
   if(text.length<=0 || text.length>100 || regex.test(text)){
     return false
   }else{
    return true
   }
  }

  requirePhone(phone:string){
    phone=phone.replace(/\s+/g,'');
    const regex=/^(0|(\+261))(33|32|34)[0-9]{7}$/;
  return regex.test(phone);
  }
  requireNombre(prix:number){
    if(prix<=0){
      return false
    }else{
      return true
    }
  }
  


}
