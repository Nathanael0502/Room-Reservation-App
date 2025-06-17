import { Component, OnInit } from '@angular/core';
import { ClientServiceService } from '../service/clientS/client-service.service';
import { LoginServiceService } from '../service/loginS/login-service.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-notification',
  imports: [LucideAngularModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit{
    constructor(private notificationS:ClientServiceService,private dataSession:LoginServiceService){}
    tabNotif:any[]=[];
id:string|null='';
idB:number=0;

    ngOnInit(): void {
      this.id=this.dataSession.getUserId();
      this.getNotification();
    }
    
    getNotification(){
      if(this.id){
        this.idB=parseInt(this.id);
       console.log(this.idB)
        this.notificationS.showNotification(this.idB).subscribe(data=>{
          this.tabNotif=data;
          console.log(this.tabNotif)
        })
    
      }
      
    }
    deleteNotification(id:number){
      if(this.id){
        this.idB=parseInt(this.id);
      }
      alert("Notification supprimer!")
      this.notificationS.deleteNotification(id).subscribe();
      this.getNotification()
      window.location.reload();
    }

}
