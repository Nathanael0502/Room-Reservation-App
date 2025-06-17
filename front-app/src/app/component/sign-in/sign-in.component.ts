import { ControleChampService } from './../../controle/controle-champ.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClientModel } from '../../models/clientModel';
import { Router, RouterLink } from '@angular/router';
import { ClientServiceService } from '../../service/clientS/client-service.service';

@Component({
  selector: 'app-sign-in',
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent{

  datasers:ClientModel={
    nom:'',
    prenom:'',
    email:'',
    telephone:'',
    password:'',
    role:'',
    photo:null
  }

imagePreview:string|ArrayBuffer|null=null;
photoName:string='';

constructor(private clientS:ClientServiceService,private router:Router,private controle:ControleChampService){}
onSelectedImage(event:any){
const input=event.target as HTMLInputElement;
if(input.files && input.files.length>0){
this.datasers.photo=event.target.files[0];
const file=input.files[0];
this.photoName=event.target.files[0].name;

const reader=new FileReader();
reader.onload=()=>{
this.imagePreview=reader.result;
};
reader.readAsDataURL(file);
}

}

valideNumber(phoneNumber:string):boolean{
  const sansEspace=phoneNumber.replace(/\s+/g,'');
  const phoneP=/^(?:\+261|0)(34|33|32)\d{7}$/
  const test= phoneP.test(sansEspace);
  if(test){

    return true
  }else{

    return false
  }
  }
testChamp=false;
  sendData():void{
    const formData=new FormData();
    if(this.controle.requireChamp(this.datasers.nom) && this.controle.requireChamp(this.datasers.password) &&
     this.controle.requireChamp(this.datasers.prenom) && this.controle.requireMail(this.datasers.email) && 
    this.controle.requirePhone(this.datasers.telephone)){
      this.testChamp=false;
    formData.append('nom',this.datasers.nom);
    formData.append('prenom',this.datasers.prenom);
    formData.append('email',this.datasers.email);
    formData.append('telephone',this.datasers.telephone);
    formData.append('password',this.datasers.password);
    formData.append('role',"user");
    formData.append('id',"0");
    if(this.datasers.photo){
    formData.append('photo',this.datasers.photo);
    
    this.clientS.postDataClient(formData).subscribe(response=>{
  console.log(response);
  alert("Compte crée avec succée")
  this.router.navigate(['/login']);
    })
  }
  else{
    alert("Veuiller selectionner une image")
  }
  }else{
    alert("Veuillez complétez toutes les champs , sans faute")
    this.testChamp=true;
  }
}

}
