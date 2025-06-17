import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReservationModel } from '../../models/reservationModel';
import { ReservationSService } from '../../service/reservation-s.service';
import { BarNavComponent } from '../bar-nav/bar-nav.component';
import { ClientServiceService } from '../../service/clientS/client-service.service';
import { ChambreServiceService } from '../../service/chambre-service.service';
import { LucideAngularModule } from 'lucide-angular';



@Component({
  selector: 'app-reservation',
  imports: [FormsModule,CommonModule,BarNavComponent,LucideAngularModule],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})

export class ReservationComponent implements OnInit{
  dateActu=new Date().toISOString().slice(0,10);
    listR:any[]=[];
     listRModel:ReservationModel={
      chambre_id:0,
      client_id:0,
      dateDebut:this.dateActu,
      dateFin:this.dateActu,
}
isShowModalCli=false;
isLastReservation=false;
constructor(private serviceData:ReservationSService,
  private serviceClient:ClientServiceService, private serviceChambre:ChambreServiceService){}

ngOnInit(): void {
    this.getReservation()
    this.getChambre();
    this.getClient();
}
searchText='';
get filterData(){
  return this.listR.filter((cli)=>
    cli.client.nom.toLowerCase().includes(this.searchText.toLowerCase()) ||
    cli.client.prenom.toLowerCase().includes(this.searchText.toLowerCase()) ||
    cli.client.email.toLowerCase().includes(this.searchText.toLowerCase()) ||
    cli.chambre.numero.toLowerCase().includes(this.searchText.toLowerCase()) 
  )
}
getReservation(){
  this.serviceData.ListReservation().subscribe(data=>{
    this.listR=data;
    console.log(this.listR)
  })
}
AjoutData(){
  if(this.listRModel.client_id==0 || this.listRModel.chambre_id==0){
    alert("Veuillez selectionner la chambre et le client");
    return;
  }
  if(this.listRModel.dateDebut<new Date() ||this.listRModel.dateDebut>=this.listRModel.dateFin){
    alert("Entrer des dates correctes");
    return;
  }
  const formData=new FormData();
  formData.append('clientId',this.listRModel.client_id.toString())
  formData.append('chambreId',this.listRModel.chambre_id.toString())
  formData.append('debut',this.listRModel.dateDebut.toString())
  formData.append('fin',this.listRModel.dateFin.toString())

  this.serviceData.AddReservation(formData).subscribe(response=>{
      console.log(response)
      alert("Donnée enregistrer avec succée")

  this.CancelBtn();
      this.getReservation();
  })
}
UpdateData(id:number){
  if(this.listRModel.client_id==0 || this.listRModel.chambre_id==0){
    alert("Veuillez selectionner la chambre et le client");
    return;
  }
  if(this.listRModel.dateDebut<this.dateActu ||this.listRModel.dateDebut>=this.listRModel.dateFin){
    alert("Entrer des dates correctes");
    return;
  }
  
  const formData=new FormData();
  formData.append('clientId',this.listRModel.client_id.toString())
  formData.append('chambreId',this.listRModel.chambre_id.toString())
  formData.append('debut',this.listRModel.dateDebut.toString())
  formData.append('fin',this.listRModel.dateFin.toString())

  this.serviceData.Modifierreservation(id,formData).subscribe(response=>{
    console.log(response)
    alert("Donnée modifier avec succée")

 this.CancelBtn();
      this.getReservation();
  })
  window.location.reload();
}
DeleteData(id:number){
  this.serviceData.DeleteReservation(id).subscribe(response=>{
  
    alert("réservation supprimée")

  this.CancelBtn();
    this.getReservation();
  })
  window.location.reload();
}
dataCli:any[]=[]
dataC:any[]=[]
getClient(){
  this.serviceClient.getDataClient().subscribe(data=>{
   this.dataCli=data;
  })
}
get filterDataC(){
  return this.dataCli.filter((cli)=>
    cli.nom.toLowerCase().includes(this.searchText.toLowerCase()) ||
    cli.prenom.toLowerCase().includes(this.searchText.toLowerCase()) ||
    cli.email.toLowerCase().includes(this.searchText.toLowerCase()) ||
    cli.role.toLowerCase().includes(this.searchText.toLowerCase()) 
  )
}

getChambre(){
  this.serviceChambre.getChambre().subscribe(data=>{
    this.dataC=data;
  })
}
get FilterRooms(){
  return this.dataC.filter(c=>c.type.toLowerCase().includes(this.searchText.toLowerCase()) || 
c.numero.toLowerCase().includes(this.searchText.toLowerCase()) 

)
}


isShowModalC=false;
ajoutCli(id:number){
  this.isShowModalCli=false;
  this.searchText='';
  this.listRModel.client_id=id;
}
ajouC(id:number){
  this.isShowModalC=false;
  this.searchText='';
  this.listRModel.chambre_id=id;
}
idR=0;
isUpdate=false;
isModal=false;
showDetail(id:number,idCli:number,idC:number,dateD:string,dateFin:string){
this.idR=id;
this.listRModel.chambre_id=idC;
this.listRModel.client_id=idCli;
this.listRModel.dateDebut=dateD;
this.listRModel.dateFin=dateFin;
this.isUpdate=true;
this.isModal=true;
}

CancelBtn(){
  this.isUpdate=false;
  this.isModal=false;
  this.listRModel.chambre_id=0;
  this.listRModel.client_id=0;
  this.listRModel.dateFin=this.dateActu;
  this.listRModel.dateDebut=this.dateActu;
}
ConfirmationReserv(id:number){
this.serviceData.confirmReserv(id).subscribe(response=>{
  alert("Donnée confirmer");
  this.getReservation();
  this.getChambre();
  this.getClient();
  console.log(response);
})
}
idC=sessionStorage.getItem('id');
RoomDispo(id:number){
  if(this.idC){
this.serviceChambre.activeChambre(id,Number(this.idC)).subscribe(data=>{
  console.log(data);
  alert("La chambre est maintenant disponible!");
});
this.getReservation();
  }
}
}
