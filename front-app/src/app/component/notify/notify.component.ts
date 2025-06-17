import { Component } from '@angular/core';
import { ClientServiceService } from '../../service/clientS/client-service.service';
import { LoginServiceService } from '../../service/loginS/login-service.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { BarNavComponent } from '../bar-nav/bar-nav.component';


@Component({
  selector: 'app-notify',
  imports: [CommonModule,FormsModule,DatePipe,LucideAngularModule,BarNavComponent],
  templateUrl: './notify.component.html',
  styleUrl: './notify.component.css'
})
export class NotifyComponent {
  constructor(private notificationS:ClientServiceService,private dataSession:LoginServiceService){}
    tabNotif:any[]=[];
id:string|null='';
idB:number=0;
notificationMessage='';
idCli=0;
    ngOnInit(): void {
      this.id=this.dataSession.getUserId();
      this.getNotification();
      this.getClient();
    }
    
    getNotification(){
      if(this.id){
        this.idB=parseInt(this.id);
       
        this.notificationS.showNotification(this.idB).subscribe(data=>{
          this.tabNotif=data;
        
        })
        console.log(this.tabNotif)
      }
      
    }
    isShowModalCli=false;
    dataCli:any[]=[];
    ajoutCli(id:number){
      this.idCli=id;
      this.isShowModalCli=false;
    }
    getClient(){
      this.notificationS.getDataClient().subscribe(data=>{
       this.dataCli=data;
      })
    }
    deleteNotification(id:number){
      if(this.id){
        this.idB=parseInt(this.id);
      }
      alert("Notification supprimer!")
      this.notificationS.deleteNotification(id).subscribe(response=>{
        console.log(response)
        this.getNotification()
      });
      window.location.reload();
     
    }
    sendNotification(){
      if(this.notificationMessage=='' || this.idCli==0){
        alert("Veuillez complétez les champs");
        return;
      }
      if(this.id){
        this.idB=parseInt(this.id);
      const formData=new FormData();
      formData.append('notification',this.notificationMessage);
      formData.append('idU',this.idB.toString());
      formData.append('idCli',this.idCli.toString());

       this.notificationS.EnvoiNotification(formData).subscribe(data=>{
        alert("Notification envoyé");
        this.getNotification()
        console.log(data);
       })
      }
    }

}
