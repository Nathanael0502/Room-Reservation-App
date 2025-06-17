import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginServiceService } from '../../service/loginS/login-service.service';
import { ClientModelD } from './clientModelL';
import { ModelClients } from '../../models/ModelClients';
import { FormsModule } from '@angular/forms';;
import { CommonModule } from '@angular/common';
import { ClientServiceService } from '../../service/clientS/client-service.service';
import { LucideAngularModule } from 'lucide-angular';
import { ControleChampService } from '../../controle/controle-champ.service';

@Component({
  selector: 'app-bar-nav',
  imports: [RouterLink,FormsModule,CommonModule,LucideAngularModule],
  templateUrl: './bar-nav.component.html',
  styleUrl: './bar-nav.component.css'
})
export class BarNavComponent  implements OnInit{
  clientData:ModelClients={
    id:0,
    nom:'',
    prenom:'',
    email:'',
    telephone:'',
    password:'',
    role:'',
    photo:''
  };
  clientInfo:ClientModelD={
    nom:'',
    prenom:'',
    id:'',
    telephone:'',
   
    email:'',
    role:'',
  }
 
  varDetailCli=false;
  image:File|null=null;

  onSelectedImage(event:any){
    this.image=event.target.files[0];
}
menu=false
onMenu(){
if(this.menu){
  this.menu=false
}else{
  this.menu=true
}

}
  ngOnInit(): void {
    this.recupCliById()
  }
   constructor(private infoCli:LoginServiceService,private clientService:ClientServiceService,
    private controle:ControleChampService
   ){
    this.clientInfo.id=this.infoCli.getUserId();
    
   
   }
    id:null|number=0;
  
    recupCliById(){
      if(this.clientInfo.id){
        this.id=parseInt(this.clientInfo.id)
        this.infoCli.findCliById(this.id).subscribe({
          next:(data)=>this.clientData=data,
          error:(err)=>console.log(err)
          
        })
      
        
        }
        
    }
   
   LogOut(){
    this.infoCli.LogOut();
   }
   
   updateCli(){
    if(this.controle.requireChamp(this.clientData.nom) && this.controle.requireChamp(this.clientData.password) &&
    this.controle.requireChamp(this.clientData.prenom) && this.controle.requireMail(this.clientData.email) && 
   this.controle.requirePhone(this.clientData.telephone)){}
   else{
    alert("Veuillez compléez les champs sans faire de faute");
    return ;
   }
    const formData=new FormData();
    formData.append('nom',this.clientData.nom);
    formData.append('prenom',this.clientData.prenom);
    formData.append('email',this.clientData.email);
    formData.append('telephone',this.clientData.telephone);
     formData.append('password',"non");
      formData.append('role',this.clientData.role);
      if(this.clientInfo.id){
        this.id=parseInt(this.clientInfo.id);
        formData.append('idU',this.id.toString());
      
    if(this.image){
   
    formData.append('photo', this.image);
    alert("Données modifier avec succées");
    window.location.reload();
    this.varDetailCli=false;
    this.clientService.updateClient(this.id,formData).subscribe((response)=>{
    })
  }else{
    this.clientService.updateCli(this.id,formData).subscribe((response)=>{
    })
  }
   }
  }
}
