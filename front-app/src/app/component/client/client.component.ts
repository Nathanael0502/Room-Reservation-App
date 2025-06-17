import { Component, OnInit } from '@angular/core';
import { ClientServiceService } from '../../service/clientS/client-service.service';
import { ClientModel } from '../../models/clientModel';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BarNavComponent } from '../bar-nav/bar-nav.component';
import { LucideAngularModule } from 'lucide-angular';
import { LoginServiceService } from '../../service/loginS/login-service.service';
import { DashServiceService } from '../../dash/dash-service.service';
import { ControleChampService } from '../../controle/controle-champ.service';


@Component({
  selector: 'app-client',
  imports: [FormsModule,CommonModule,BarNavComponent,LucideAngularModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit{
  isModalOpen:boolean=false;
  isUpdate:boolean=false;
  dataCli:any[]=[];
  dataClient:ClientModel={
    nom:'',
    prenom:'',
    email:'',
    telephone:'',
    password:'',
    role:'',
    photo:null
  }
  id:string|null='';
  tabMCli:any[]=[]
  bestCli:any={};
  payCli:any={};
  constructor(private clientS:ClientServiceService,private info:LoginServiceService,
    private dash:DashServiceService,private control:ControleChampService
  ){}
  searchText='';
navChambre={
  cliRP:"cliRP",
  cliNP:"cliNP",
  cliLP:'cliLP'
}
varNav='';

ngOnInit(): void {
this.receiveDataClient();
this.id=this.info.getUserId();
this.dash.getTopCli().subscribe(data=>{
  this.tabMCli=data;
})
this.dash.getBestCli().subscribe(data=>{
  this.bestCli=data;
  console.log(this.bestCli)
})
this.dash.getBestPay().subscribe(data=>{
this.payCli=data;
})
}

onFileSelected(event:any){
  this.dataClient.photo=event.target.files[0];
}
receiveDataClient():void{
this.clientS.getDataClient().subscribe(data=>{
this.dataCli=data;
})
}
get filterData(){
  return this.dataCli.filter((cli)=>
    cli.nom.toLowerCase().includes(this.searchText.toLowerCase()) ||
    cli.prenom.toLowerCase().includes(this.searchText.toLowerCase()) ||
    cli.email.toLowerCase().includes(this.searchText.toLowerCase()) ||
    cli.role.toLowerCase().includes(this.searchText.toLowerCase()) 
  )
}

sendData():void{
  const formData=new FormData();
  if(this.control.requireChamp(this.dataClient.nom)&&this.control.requireChamp(this.dataClient.prenom)&&
  this.control.requireMail(this.dataClient.email)&&this.control.requirePhone(this.dataClient.telephone)){
    
  }
  else{
    alert("Veuillez controler vos champs")
    return;
  }
  if(this.dataCli.find(cli=>cli.email===this.dataClient.email)!==undefined){
    alert("cette adresse email existe déjà");
    return;
  }
  this.id=this.info.getUserId();
  formData.append('nom',this.dataClient.nom);
  formData.append('prenom',this.dataClient.prenom);
  formData.append('email',this.dataClient.email);
  formData.append('telephone',this.dataClient.telephone);
  formData.append('password',this.dataClient.password);
  formData.append('role',this.dataClient.role);
  if(this.id){
   formData.append('id',this.id);
  }
  if(this.dataClient.photo){
  formData.append('photo',this.dataClient.photo);
  }
  this.clientS.postDataClient(formData).subscribe(response=>{
console.log(response);
alert("Donnée ajouter avec succées")
this.closeModal();
window.location.reload();
  })
  this.receiveDataClient();
  window.location.reload();
}

deleteData(id:number):void{
  if(this.id){

this.clientS.deleteClient(id,parseInt(this.id)).subscribe(response=>{
  this.closeModal();
  alert("client supprimer")
  window.location.reload();
})
window.location.reload();
  }
this.receiveDataClient();
}
idData:number=0;
updatClient(id:number):void{
  if(this.control.requireChamp(this.dataClient.nom)&&this.control.requireChamp(this.dataClient.prenom)&&
  this.control.requireMail(this.dataClient.email)&&this.control.requirePhone(this.dataClient.telephone)){
    
  }
  else{
    alert("Veuillez controler vos champs")
    return;
  }
  

  const formData=new FormData();
  formData.append('nom',this.dataClient.nom);
  formData.append('prenom',this.dataClient.prenom);
  formData.append('email',this.dataClient.email);
  formData.append('telephone',this.dataClient.telephone);
  formData.append('password',"non");
  if(this.id){
  formData.append('idU',this.id);
  }
  formData.append('role',this.dataClient.role);
  if(this.dataClient.photo){
  formData.append('photo',this.dataClient.photo);
  this.clientS.updateClient(id,formData).subscribe((response)=>{
    console.log(response);
   this.closeModal();
   window.location.reload();
  })
  window.location.reload();
  }
  else{
    this.clientS.updateCli(id,formData).subscribe((response)=>{
      console.log(response);
      window.location.reload();
})
window.location.reload();
  }
  this.receiveDataClient();
  window.location.reload();
}
closeModal(){
   this.isUpdate=false;
   this.isModalOpen=false;
   this.isDetail=false;
   this.dataClient={
    
    nom:'',
    prenom:'',
    email:'',
    telephone:'',
    password:'',
    role:'',
    photo:null
  }
}
isDetail:boolean=false;
ImagePath:string='';
ShowDetail(id:number,nom:string,prenom:string,email:string,telephone:string,role:string,imagePath:string,detail:boolean){
  this.isUpdate=true;
  this.isModalOpen=true;
this.dataClient.nom=nom;
this.dataClient.email=email;
this.dataClient.prenom=prenom;
this.dataClient.telephone=telephone;
this.dataClient.role=role;
this.idData=id;
this.ImagePath=imagePath;
this.isDetail=detail;

}
}

