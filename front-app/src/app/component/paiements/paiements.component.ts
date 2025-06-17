import { Component, OnInit } from '@angular/core';
import { PaiementServiceService } from '../../service/paiementS/paiement-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BarNavComponent } from '../bar-nav/bar-nav.component';
import { ReservationSService } from '../../service/reservation-s.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { LucideAngularModule } from 'lucide-angular';
import { LoginServiceService } from '../../service/loginS/login-service.service';
@Component({
  selector: 'app-paiements',
  imports: [FormsModule,CommonModule,BarNavComponent,LucideAngularModule],
  templateUrl: './paiements.component.html',
  styleUrl: './paiements.component.css'
})
export class PaiementsComponent implements OnInit{
 ListePay:any[]=[];
 ListeCli:any[]=[];
 DataPay={
  reservationID:0,
 modePaiement:'',
 }

constructor(private paiemenS:PaiementServiceService,private clients:ReservationSService,
  private info:LoginServiceService
){}
i=0;
idI:string|null='';
ngOnInit(): void {
    this.listPay();
    this.listCli();
   this.idI=this.info.getUserId();

  }

  searchText='';
get filterData(){
  return this.ListePay.filter((cli)=>
    cli.reservation.client.nom.toLowerCase().includes(this.searchText.toLowerCase()) ||
    cli.reservation.client.prenom.toLowerCase().includes(this.searchText.toLowerCase()) ||
    cli.reservation.client.email.toLowerCase().includes(this.searchText.toLowerCase()) ||
    cli.reservation.chambre.numero.toLowerCase().includes(this.searchText.toLowerCase()) ||
     cli.methode.toLowerCase().includes(this.searchText.toLowerCase())
  )
}
isShowModal:boolean=false;
ajoutRes(id:number){

  this.DataPay.reservationID=id;
  this.searchText='';
  this.isShowModal=false;
}
listCli(){
this.clients.ListReservation().subscribe(data=>{
  this.ListeCli=data;
})
}
listPay(){
  this.paiemenS.GetPaiement().subscribe(data=>{
    console.log(data);
    this.ListePay=data;
})

}
get filterT(){
  return this.ListeCli.filter((cli)=>
    cli.client.nom.toLowerCase().includes(this.searchText.toLowerCase()) ||
    cli.client.prenom.toLowerCase().includes(this.searchText.toLowerCase()) ||
    cli.client.email.toLowerCase().includes(this.searchText.toLowerCase()) ||
    cli.chambre.numero.toLowerCase().includes(this.searchText.toLowerCase()) 
  )
}
SendPay(){
  if(this.DataPay.reservationID==0 || this.DataPay.modePaiement==''){
    alert("Veuillez compléter les champs");
    return;
  }
  const formData=new FormData();
  formData.append('reservationID',this.DataPay.reservationID.toString());
  formData.append('modePaiement',this.DataPay.modePaiement);
  if(this.idI){
  formData.append('idU',this.idI)
  }
  this.paiemenS.AddPaiement(formData).subscribe(response=>{
    console.log(response);
    alert("Paiement ajouter avec succée");
    this.DataPay.reservationID=0;
    this.DataPay.modePaiement='';
   this.listPay()
  })
}

isUpdate:boolean=false;
UpdatePay(id:number){
  const formData=new FormData();
  formData.append('reservationID',this.DataPay.reservationID.toString());
  formData.append('modePaiement',this.DataPay.modePaiement);
  formData.append('statut','Payé');
  if(this.idI){
    formData.append('idU',this.idI)
    }
  this.paiemenS.UpdatePaimement(id,formData).subscribe(response=>{
    console.log(response);
    alert("Paiment modifier avec succée")
    this.DataPay.reservationID=0;
    this.DataPay.modePaiement='';
    this.isUpdate=false;
  this.listPay()
  })
}
idP:number=0;
showDetail(id:number,Resrid:number,modePay:string){
  this.idP=id;

  this.DataPay.reservationID=Resrid;
  this.DataPay.modePaiement=modePay;
  this.isUpdate=true;
}
DeletePay(id:number){
  if(this.idI){
this.paiemenS.DeletePaiement(id,parseInt(this.idI)).subscribe(response=>{
  console.log(response);
  alert("Paiement supprimer avec succées")
this.listPay()
})
  }
}
isPay=false;
cancelBtn(){
this.isUpdate=false;
this.DataPay.reservationID=0;
this.DataPay.modePaiement='';

}
Today=new Date();
dateFormatted=this.Today.toLocaleDateString('fr-FR');

Facturation(nom:string,prenom:string,nC:string,nb:number,prixU:number,prixT:number,type:string,datePay:string){
  const doc =new jsPDF();
  doc.setFontSize(18);
  doc.text('Facture de Paiement',14,20);
  doc.setFontSize(14);
  doc.text('NathaHôtel',14,30);
  
  doc.setFontSize(12);
  doc.text(`Client: ${nom} ${prenom}`,14,40);
  doc.text(`Date: ${this.dateFormatted}`,14,50);
  doc.text(`Numéro chambre: ${nC}`,14,60);

  autoTable(doc,{
    startY:70,
    head:[['Description','Type de chambre','Nombre de nuits','Prix Unitaire','Total']],
    body:[['Location de chambre',type,nb,prixU+',00 Ar',prixT+',00 Ar']],
    theme:'grid'
  });

  const finalY=(doc as any).lastAutoTable ? (doc as any).lastAutoTable.finalY:80;
  doc.setFontSize(14);
  doc.text('Total à payer: '+prixT+',00 Ar',14,finalY+10)

  doc.save(`facture_${nom}_${prenom}_${datePay}.pdf`)
}

}


