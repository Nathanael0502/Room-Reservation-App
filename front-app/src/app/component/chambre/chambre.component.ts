import { ControleChampService } from './../../controle/controle-champ.service';


import { ChambreServiceService } from './../../service/chambre-service.service';
import { FormsModule } from '@angular/forms';

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { modelChambre } from '../../models/ChambreModel';
import { BarNavComponent } from '../bar-nav/bar-nav.component';
import { SousChambreComponent } from '../../sousComponent/sous-chambre/sous-chambre.component';
import { ListeCIndispoComponent } from '../../sousComponent/liste-cindispo/liste-cindispo.component';
import { RouterLink } from '@angular/router';
import {  LucideAngularModule } from 'lucide-angular';
import { LoginServiceService } from '../../service/loginS/login-service.service';
import { StarRatingComponent } from '../../star-rating/star-rating.component';

@Component({
  selector: 'app-chambre',
  standalone:true,
  imports: [FormsModule,CommonModule,BarNavComponent,SousChambreComponent,
    ListeCIndispoComponent,LucideAngularModule,StarRatingComponent],
  templateUrl: './chambre.component.html',
  styleUrl: './chambre.component.css'
})
export class ChambreComponent implements OnInit{
  chambres:any[]=[];
  dataRoom:modelChambre={
    numero:'',
    type:'',
    prix:0,
    file:null
  }
  idData:number=0;
   constructor(private ChambreService:ChambreServiceService,private info:LoginServiceService,
    private control:ControleChampService
   ){}
   onFileSelected(event:any){
         this.dataRoom.file=event.target.files[0];
   }
id:string | null='';
isModalOpen:boolean=false;
isDispo:boolean=true;
tabStar:any[]=[];
tabNotes:any[]=[];
listBestRooms:any[]=[];
ngOnInit(): void {
this.loadRoom();
this.id=this.info.getUserId();
this.getStarsC();

this.getComment();
this.ChambreService.getStars().subscribe(data=>
  this.tabStar=data
  
)
this.ChambreService.getNotes().subscribe(data=>
  this.tabNotes=data
)
this.ChambreService.getBestRoom().subscribe(data=>
  this.listBestRooms=data)
}

get getSt(){
  return this.tabStar.filter(c=>c.chambre.type.toLowerCase().includes(this.searchText.toLowerCase()) || 
  c.chambre.numero.toLowerCase().includes(this.searchText.toLowerCase()) || 
  c.client.nom.toLowerCase().includes(this.searchText.toLowerCase()) || c.client.prenom.toLowerCase().includes(this.searchText.toLowerCase()))
}
get getR(){
  return this.listBestRooms.filter(c=>c.type.toLowerCase().includes(this.searchText.toLowerCase()) || 
  c.numero.toLowerCase().includes(this.searchText.toLowerCase()) )
}
varNav='';
loadRoom():void{
  this.ChambreService.getChambre().subscribe(data=>{
    this.chambres=data;
  })
 
}
searchText='';
get FilterRooms(){
  return this.chambres.filter(c=>c.type.toLowerCase().includes(this.searchText.toLowerCase()) || 
c.numero.toLowerCase().includes(this.searchText.toLowerCase()) 
// c.prix.includes(this.searchText) ||
// c.id.includes(this.searchText)
)
}
recupIdC=0;
tabStars:any[]=[];
tabCom:any[]=[];
getStarsC(){
  this.ChambreService.getStars().subscribe(data=>{
    this.tabStars=data;
  })
}
getComment(){
  this.ChambreService.getNotes().subscribe(data=>{
    this.tabCom=data;
  })
}
   addRoom(){
   
    const formaData=new FormData();
  const t=  this.chambres.find(c=>c.numero===this.dataRoom.numero);
  if(t!==undefined){
  alert("Veuillez changer le numero car il existe dejà");
  return;
  }
  if(this.control.requireChamp(this.dataRoom.numero)&& this.control.requireChamp(this.dataRoom.type) &&
this.control.requireNombre(this.dataRoom.prix)
){
  
}else{
  alert("Veuillez complétez toutes les champs , sans faute");
  return;
}
if(!this.dataRoom.file){
  alert("Veuillez selectionnez une image ") 
  return};
  formaData.append('numero',this.dataRoom.numero);
    formaData.append('type',this.dataRoom.type);
    formaData.append('prix',this.dataRoom.prix.toString());
    formaData.append('file',this.dataRoom.file)
    if(this.id){
      formaData.append('id',this.id);
    }
    this.ChambreService.addChambre(formaData).subscribe(()=>{
      alert("chambre ajouteé avec succées");
      this.loadRoom();
      window.location.reload()
    })
  
   }
   updateRoom(id:number){
    
    
   const formaData=new FormData();

 if(this.control.requireChamp(this.dataRoom.numero)&& this.control.requireChamp(this.dataRoom.type) 
  &&this.control.requireNombre(this.dataRoom.prix)
){
 
}else{
  alert("Veuillez complétez toutes les champs , sans faute");
  return;
}
    formaData.append('numero',this.dataRoom.numero);
    formaData.append('type',this.dataRoom.type);
    formaData.append('prix',this.dataRoom.prix.toString());
    if(this.id){
      formaData.append('idU',this.id);
    }
    if(this.dataRoom.file){

    formaData.append('image',this.dataRoom.file)
    this.ChambreService.updateCambre(id,formaData).subscribe((response)=>{
      alert("Donnée modifier avec succée")
      this.loadRoom();
      window.location.reload()

    })
    window.location.reload();
    }else{
      this.ChambreService.updateDetail(id,formaData).subscribe((response:any)=>{
        alert("Donnée modifier avec succée")
        console.log(response)
        this.loadRoom();
        window.location.reload()
      })
    }
    this.loadRoom();
    window.location.reload();
   }

   deleteRoom(id:number){
    if(this.id){
    this.ChambreService.disableChmbre(id,parseInt(this.id)).subscribe(response=>{
       console.log(response)
       this.loadRoom();
       window.location.reload()
    })
  }
    this.loadRoom();
   }
   isUpdate:boolean=false;
  setData(id:number,type:string,numero:string,prix:number){
    this.isModalOpen=true
     this.dataRoom.numero=numero
     this.dataRoom.type=type
     this.dataRoom.prix=prix
    this.idData=id;
    this.isUpdate=true;
  }
  activeRoom(id:number){
    if(this.id){
    this.ChambreService.activeChambre(id,parseInt(this.id)).subscribe(response=>{
      console.log(response);
      this.loadRoom();
      window.location.reload()
    })
  }
    this.loadRoom();

  }
  closeModal(){
    this.isModalOpen=false
    this.isUpdate=false
    this.dataRoom={
      numero:'',
      type:'',
      prix:0,
      file:null
    }
  }
chambr={
id:0,
numero:'',
type:'',
prix:0,
imageUrl:'',
disponible:false
}
isDetail:boolean=false

  DetailsChambre(id:number,numero:string,type:string,prix:number,imageUrl:string,diponible:boolean){
    this.isDetail=true

   this.chambr.id=id
   this.chambr.disponible=diponible
   this.chambr.imageUrl=imageUrl
   this.chambr.numero=numero
   this.chambr.type=type
   this.chambr.prix=prix
 }

 clickNotDetatil(){
    this.isDetail=false
  }
  receiveClose(value:boolean){
      this.isDetail=value
      console.log(value)
  }


}
