import { Component, OnInit } from '@angular/core';
import { ChambreServiceService } from '../../service/chambre-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { modelChambre } from '../../models/ChambreModel';
import { SousChambreComponent } from '../../sousComponent/sous-chambre/sous-chambre.component';
import { LucideAngularModule } from 'lucide-angular';
import { LoginServiceService } from '../../service/loginS/login-service.service';

@Component({
  selector: 'app-liste-cindispo',
  imports: [CommonModule,FormsModule,SousChambreComponent,LucideAngularModule],
  templateUrl: './liste-cindispo.component.html',
  styleUrl: './liste-cindispo.component.css'
})
export class ListeCIndispoComponent implements OnInit{
  searchText='';
chambreIndispo:any[]=[]
dataRoom:modelChambre={
  numero:'',
  type:'',
  prix:0,
  file:null
}

idData:number=0;
constructor(private listeIndispo:ChambreServiceService,private rinfo:LoginServiceService){
}
get FilterRooms(){
  return this.chambreIndispo.filter(c=>c.type.toLowerCase().includes(this.searchText.toLowerCase()) || 
c.numero.toLowerCase().includes(this.searchText.toLowerCase()) 
// c.prix.includes(this.searchText) ||
// c.id.includes(this.searchText)
)
}
isModalOpen:boolean=false;
ngOnInit(): void {
this.getRoomsIndispo()
}
getRoomsIndispo(){
  this.listeIndispo.ListeChambreIndispo().subscribe(data=>{
    this.chambreIndispo=data;
  })
}

onFileSelected(event:any){
  this.dataRoom.file=event.target.files[0];
}

updateRoom(id:number){
  const formaData=new FormData();

  formaData.append('numero',this.dataRoom.numero);
  formaData.append('type',this.dataRoom.type);
  formaData.append('prix',this.dataRoom.prix.toString());
  if(this.dataRoom.file){

  formaData.append('image',this.dataRoom.file)
  this.listeIndispo.updateCambre(id,formaData).subscribe((response)=>{
    alert("Donnée modifier avec succée")
    this.getRoomsIndispo();

  })
  }else{
    this.listeIndispo.updateDetail(id,formaData).subscribe((response:any)=>{
      alert("Donnée modifier avec succée")
      console.log(response)
      this.getRoomsIndispo();

    })
  }


 }

 deleteRoom(id:number){
  this.listeIndispo.setDispoChambre(id).subscribe(response=>{
     console.log(response)
     this.getRoomsIndispo();
  })

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
idj:string|null='';
activeRoom(id:number){
  this.idj=this.rinfo.getUserId();
  if(this.idj){
  this.listeIndispo.activeChambre(id,parseInt(this.idj)).subscribe(response=>{
    console.log(response);
    this.getRoomsIndispo();
  })
}

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
