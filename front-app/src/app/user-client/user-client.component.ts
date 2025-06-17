import { Component, OnInit} from '@angular/core';
import {LucideAngularModule} from 'lucide-angular';
import { ChambreServiceService } from '../service/chambre-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginServiceService } from '../service/loginS/login-service.service';
import { ClientModelD } from '../component/bar-nav/clientModelL';
import { ClientServiceService } from '../service/clientS/client-service.service';
import { ModelClients } from '../models/ModelClients';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { ReservationSService } from '../service/reservation-s.service';
import { ReservCliComponent } from '../reserv-cli/reserv-cli.component';
import { NotificationComponent } from '../notification/notification.component';
import { PayCliComponent } from '../pay-cli/pay-cli.component';

import { HistoriquesComponent } from '../historiques/historiques.component';
import { StarsNotesService } from '../stars-notes.service';
import { DataStatComponent } from '../data-stat/data-stat.component';
import { ControleChampService } from '../controle/controle-champ.service';
import { FactureCliComponent } from '../facture-cli/facture-cli.component';
import { EmailSService } from '../email-s.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-user-client',
  imports: [LucideAngularModule,CommonModule,FormsModule,StarRatingComponent,ReservCliComponent,
    NotificationComponent,PayCliComponent,DataStatComponent,HistoriquesComponent,FactureCliComponent,
  RouterLink
  ],
  templateUrl: './user-client.component.html',
  styleUrl: './user-client.component.css'
})
export class UserClientComponent implements OnInit {
  tabChambre:any[]=[];
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
  navigColor=true;
  navigColor1=false;
  navigColor2=false;
  navigColor3=false;
  navigColor4=false;
  navigColor5=false;
  navigColor6=false;
  varFact=false;
  varError=false;
  roomRating=0;
  image:File|null=null;
  varDetailCli:boolean=false;
  lien:string='Accueil';
  
    constructor(private serviceChambre:ChambreServiceService,private infoCli:LoginServiceService,
      private clientService:ClientServiceService,private  serviceData:ReservationSService,
      private starS:StarsNotesService,private controle:ControleChampService,
      private message:EmailSService
    ){
      this.clientInfo.id=this.infoCli.getUserId();
      this.clientInfo.role=this.infoCli.getUserRole();
    }
    tabStars:any[]=[];
    ngOnInit(): void {
      this.getMessage();
        this.getDisponibleChambre();
        this.recupCliById();
        this.showNotesList();
     
        if(this.clientInfo.id){
          this.id=parseInt(this.clientInfo.id);
          this.starS.getStars(this.id).subscribe(data=>{
            this.tabStars=data;
          })
        }
    }
    getDisponibleChambre(){
       this.serviceChambre.getChambre().subscribe(data=>{
        this.tabChambre=data;
       })
    }
    navigateTo(nav:string){
      switch(nav){
        case('Accueil'):
           this.navigColor=true;
           this.navigColor1=false;
           this.navigColor2=false;
           this.navigColor3=false;
           this.navigColor4=false;
           this.navigColor5=false;
           this.navigColor6=false;
           break;
        case('Chambres'):
           this.navigColor1=true;
           this.navigColor=false;
           this.navigColor2=false;
           this.navigColor3=false;
           this.navigColor4=false;
           this.navigColor5=false;
           this.navigColor6=false;
           break;
        case('Reservations'):
           this.navigColor2=true;
           this.navigColor1=false;
           this.navigColor=false;
           this.navigColor3=false;
           this.navigColor4=false;
           this.navigColor5=false;
           this.navigColor6=false;
           break;  
        case('Notifications'):
           this.navigColor3=true;
           this.navigColor1=false;
           this.navigColor2=false;
           this.navigColor=false;
           this.navigColor4=false;
           this.navigColor5=false;
           this.navigColor6=false;
           break;
        case('Paiements'):
           this.navigColor4=true;
           this.navigColor1=false;
           this.navigColor2=false;
           this.navigColor3=false;
           this.navigColor=false;
           this.navigColor5=false;
           this.navigColor6=false;
           break; 
        case('ChatAI'):
           this.navigColor5=true;
           this.navigColor1=false;
           this.navigColor2=false;
           this.navigColor3=false;
           this.navigColor4=false;
           this.navigColor=false;
           this.navigColor6=false;
           break;
        case('Historiques'):
           this.navigColor6=true;
           this.navigColor1=false;
           this.navigColor2=false;
           this.navigColor3=false;
           this.navigColor4=false;
           this.navigColor5=false;
           this.navigColor=false;
           break;
        
      }
       this.lien=nav;
       
    }
    onSelectedImage(event:any){
           this.image=event.target.files[0];
    }
    
    logOut(){
    
      this.infoCli.LogOut();
    }
    idString:null|string='';
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
stb=false;
i=0;

    updateCli(){
      if(this.controle.requireChamp(this.clientData.nom) && this.controle.requireChamp(this.clientData.password) &&
      this.controle.requireChamp(this.clientData.prenom) && this.controle.requireMail(this.clientData.email) && 
     this.controle.requirePhone(this.clientData.telephone)){}
     else{
      alert("Veuillez complétez les champs sans faire de faute");
      return ;
     }
      const formData=new FormData();
      formData.append('nom',this.clientData.nom);
      formData.append('prenom',this.clientData.prenom);
      formData.append('email',this.clientData.email);
      formData.append('telephone',this.clientData.telephone);
       formData.append('password',"non");
        formData.append('role',this.clientData.role);
      if(this.image){
      if(this.clientInfo.id){
      this.id=parseInt(this.clientInfo.id);
      formData.append('photo', this.image);
      formData.append('idU',this.id.toString());
      alert("Données modifier avec succées");
    
      this.varDetailCli=false;
      this.clientService.updateClient(this.id,formData).subscribe((response)=>{
      })
      window.location.reload();
    }
  }
    else{
      if(this.clientInfo.id){
        this.id=parseInt(this.clientInfo.id);
        alert("Données modifier avec succées");
        formData.append('idU',this.id.toString());
        this.varDetailCli=false;
        this.clientService.updateCli(this.id,formData).subscribe((response)=>{
          
          alert("Données modifier avec succées")
          window.location.reload();
          this.varDetailCli=false;
         })
         window.location.reload();
      }
       }
      }
    
      //Details Chambres
      notes:string='';
      showNotes:boolean=false;
      dataC={
        id:0,type:'',numero:'',prix:'',image:''
      }
      AfficheNotes(id:number,type:string,numero:string,prix:string,image:string){
          
          this.showNotes=true;
          this.dataC.image=image;
          this.dataC.id=id;
          this.dataC.numero=numero;
          this.dataC.prix=prix;
          this.dataC.type=type;
      }
  nbStars:number=0;
      ajoutNotes(){
        if(this.notes=="" || this.dataC.id<=0 || this.id==null){
          alert("Veuillez ecrire une note");
          return;
        }
        if(this.clientInfo.id){
          this.id=parseInt(this.clientInfo.id);
          const formData=new FormData();
          formData.append('notes',this.notes);
          formData.append('idChambre',this.dataC.id.toString());
          formData.append('idClient',this.id.toString());
          this.serviceChambre.ajoutNotes(formData).subscribe(response=>{
            console.log(response);
            alert("Note ajouter")
            // this.showNotes=false;
            // this.varNotes=false;
            this.showNotesList();
            this.notes="";
          })
        }
     }
    tabNotes:any[]=[];
    uniqueItems:any[]=[];

  showNotesList(){
     
    this.serviceChambre.getNotes().subscribe(data=>{
      this.tabNotes=data;
      this.uniqueItems=this.tabNotes.filter((item,index,self)=>index===self.findIndex(t=>t.chambre.id===item.chambre.id));
      console.log(this.uniqueItems)
    })
  }
  updateRating(roomId:number,newRatting:number){
    const romm=this.tabNotes.find(r=>r.id===roomId);
    if(romm){
      romm.nbStars=newRatting;
       const formData=new FormData();
       formData.append('nbStars',newRatting.toString());
      this.serviceChambre.updateSt(roomId,formData).subscribe(response=>{
          
        console.log(response);
        this.showNotesList()
      })
    }
  }
  //miasa

  
  clientId:string|null='';
  bb=0;
  showNotesS(id:number){
   this.bb=id;

   this.stb = true  }
  addUpdateRating(roomId:number,nbStars:number){
 
    this.clientId=this.infoCli.getUserId();
    if(this.clientId){
      const formData=new FormData();
      formData.append("stars",nbStars.toString());
      formData.append("clientId",this.clientId);
      formData.append("chambreId",roomId.toString());
      console.log(nbStars,this.clientId,roomId.toString());
      this.starS.addOrUpdateStars(formData).subscribe(response=>{
        console.log(response)
        this.getDisponibleChambre();
        
        if(this.clientInfo.id){
          this.id=parseInt(this.clientInfo.id);
          this.starS.getStars(this.id).subscribe(data=>{
            this.tabStars=data;
          })
        }
        
      })
     
    }
   
  }
Close(){
  this.stb=false;
  this.i=0;
}
  //vita
  varNotes:boolean=false;
  showEntryNote(id:number,nbStarts:number){
   this.varNotes=true;
   this.dataC.id=id;
   this.nbStars=nbStarts;
  }
  deleteNotes(id:number){
    this.serviceChambre.deleteNotes(id).subscribe(response=>{
      console.log(response);
      alert("Notes supprimer!")
      // this.varNotes=false;
      this.showNotesList()
    })
  }
  dateActu:string=new Date().toISOString().split('T')[0];
  DateDebut:string|Date=this.dateActu;
  DateFin:string|Date=this.dateActu;
 varReserv:boolean=false;
 showReser(idC:number){

  this.dataC.id=idC;
  this.varReserv=true;
 }
 cancelReserv(event:MouseEvent){
 event.preventDefault();
  this.DateDebut='';
this.DateFin='';
this.varReserv=false;
 }
 AjoutData(){
  const formData=new FormData();
  if(this.dataC.id<=0 || this.DateDebut<new Date() || this.DateDebut>=this.DateFin ){
    this.varError=true;
    alert("Veuillez bien saisir les champs");
    return;
  }else{
    this.varError=false;
  }
  if(this.clientInfo.id){
    this.id=parseInt(this.clientInfo.id);
  formData.append('clientId',this.id.toString())
  }
  formData.append('chambreId',this.dataC.id.toString())
  formData.append('debut',this.DateDebut.toString())
  formData.append('fin',this.DateFin.toString())

  this.serviceData.AddReservation(formData).subscribe(response=>{
      console.log(response)
      alert("Reservation demander avec succées , en attente de reponse")
     window.location.reload();
this.DateDebut='';
this.DateFin='';
this.varReserv=false;

  })
}
tabCli:any[]=[];
getMessage(){
  this.message.getPJ().subscribe(data=>
    this.tabCli=data.filter((cli)=>cli.client.id==this.clientInfo.id)
  )
  }

}
