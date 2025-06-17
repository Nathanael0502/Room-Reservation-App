import { Component, OnInit } from '@angular/core';
import { EmailResponse } from '../models/email.model';
import { EmailSService } from '../email-s.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BarNavComponent } from '../component/bar-nav/bar-nav.component';
import { LucideAngularModule } from 'lucide-angular';
import { PaiementServiceService } from '../service/paiementS/paiement-service.service';
import { FactureComponent } from '../facture/facture.component';
@Component({
  selector: 'app-email-c',
  imports: [CommonModule,FormsModule,BarNavComponent,LucideAngularModule,FactureComponent],
  templateUrl: './email-c.component.html',
  styleUrl: './email-c.component.css'
})
export class EmailCComponent implements OnInit {
recipient='';
subject='';
body='';
file:File|null=null;
responses:EmailResponse[]=[];
emailId:string='';

isFacture:boolean=false;
constructor(private emailService:EmailSService,private serviceClient:PaiementServiceService){}
ngOnInit(): void {
   this.getListFacture();
      this.getClient();
    
}
isShowModalCli=false;
onFileSelected(event:any):void{
  this.file=event.target.files[0];
}
idCli=0;
sendFacture(){
  if(this.idCli==0 || this.file==null){
    alert("Veuillez complétez les champs");
    return ;
  }
  const formData=new FormData();
  formData.append('idCli',this.idCli.toString())
  if(this.file){
    formData.append('file',this.file);
    this.emailService.postPJ(formData).subscribe(response=>{
          alert(response.message);
          this.file=null;
          this.idCli=0;
    })
    window.location.reload();
  }
}
searchText='';
dataFac:any[]=[];
getListFacture(){
   this.emailService.getPJ().subscribe(data=>{
    this.dataFac=data;
   })
}


dataCli:any[]=[];
ajoutCli(id:number){
   this.idCli=id;
   this.isShowModalCli=false;
   this.searchText='';
}
getClient(){
  this.serviceClient.GetPaiement().subscribe(data=>{
   this.dataCli=data;
 
  })
}



get filterDataC(){
  return this.dataCli.filter((cli)=>
    cli.reservation.client.nom.toLowerCase().includes(this.searchText.toLowerCase()) ||
    cli.reservation.client.prenom.toLowerCase().includes(this.searchText.toLowerCase()) ||
    cli.reservation.client.email.toLowerCase().includes(this.searchText.toLowerCase()) ||
    cli.reservation.client.role.toLowerCase().includes(this.searchText.toLowerCase()) 
  )
}
sendEmail(){
const formData=new FormData();
formData.append('recipient',this.recipient);
formData.append('subject',this.subject);
formData.append('body',this.body);
if(this.file){
  formData.append('file',this.file);
}
this.emailService.sendMail(formData).subscribe(response=>{
  console.log(response);
  alert("Email envoyé avec succées");
  this.emailId=response.emailId;
  this.loadResponse();
})
}

loadResponse():void{
  if(this.emailId!=''){
    this.emailService.getResponses(this.emailId).subscribe(response=>{
      this.responses=response;
    })
  }
}

replyToEmail():void{
const response:EmailResponse={
  emailId:this.emailId,
  sender:'natharandrianjafy@gmail.com',
  body:this.body
};
this.emailService.replyToEmail(response).subscribe(()=>{
  alert("Réponse envoyée avec succès !");
  this.loadResponse();
})

}

}
