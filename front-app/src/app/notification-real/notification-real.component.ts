import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../servicesIP/web-soket-imp.service';

@Component({
  selector: 'app-notification-real',
  imports: [],
  templateUrl: './notification-real.component.html',
  styleUrl: './notification-real.component.css'
})
export class NotificationRealComponent implements OnInit {
  senderId:string|null=null;
  id=0;
  notifications=[{id:0,message:'',timestamp:Date.now().toLocaleString(),titre:''}]
  constructor(private notifService: WebSocketService){}

  ngOnInit(): void {
      this.senderId=sessionStorage.getItem('id');
      if(this.senderId){
      this.id=(Number(this.senderId))
      }
      setTimeout(()=> this.notifService.notification$.subscribe(notification=>{
        this.notifications.push(notification);
        }),5000);
     
  }

}
