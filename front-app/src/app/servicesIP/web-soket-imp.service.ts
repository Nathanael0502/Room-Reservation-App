import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import  SockJS from 'sockjs-client';
import * as Stomp from '@stomp/stompjs';
 
@Injectable({
  providedIn: 'root'
})

export class WebSocketService {
  private apiUrl = "http://localhost:8080/api/messages";
  private socket$: WebSocketSubject<any> | null = null;
  private userId: string = '';

 
private stompClient:any;
private messageSubject=new BehaviorSubject<{sender:{id:number,photo:string},receiver:{id:number,photo:string},message:string,photo:string,test:boolean}>(
  {sender:{id:0,photo:''},receiver:{id:0,photo:''},message:'',photo:'',test:false}
);
private notificationSubject=new BehaviorSubject<{id:number,message:string,timestamp:string,titre:string}>({id:0,message:'',timestamp:Date.now().toLocaleString(),titre:''})
public messages$=this.messageSubject.asObservable();
public notification$=this.notificationSubject.asObservable();
constructor(private http: HttpClient) {
this.connect();
}
private connect(){
  const socket=new SockJS('http://localhost:8080/api/chat-websocket');
  this.stompClient=Stomp.Stomp.over(socket);

  this.stompClient.connect({},()=>{
    this.stompClient.subscribe('/topic/messages',(message:any)=>{
      const receivedMessage=JSON.parse(message.body);
    
           this.messageSubject.next(receivedMessage);
      
    });
    

    // this.stompClient.send('/app/getMessages',{},{});
  })
//   this.stompClient.connect({},()=>{
//     this.stompClient.subscribe('/topic/notifications',(message:any)=>{
//       const receivedMessage=JSON.parse(message.body);
    
//            this.notificationSubject.next(receivedMessage);
      
//     });
//     this.stompClient.send('/app/getNotifications',{},{})
// });
}

sendMessage(message:{sender:{id:number,photo:string},receiver:{id:number,photo:string},Message:string,photo:string,test:boolean}){
this.stompClient.send('/app/sendMessage',{},JSON.stringify(message));
}
sendWithDB(message:FormData):Observable<any>{
  return this.http.post(`${this.apiUrl}/envoi`,message);
}
sendWithImg(message:FormData):Observable<any>{
  return this.http.post(`${this.apiUrl}/withImg`,message);
}
getMessage(senderId:string,receiverId:string):Observable<{sender:{id:number,photo:string},receiver:{id:number,photo:string},message:string,photo:string,test:boolean}[]>{
  return this.http.get<{sender:{id:number,photo:string},receiver:{id:number,photo:string},message:string,photo:string,test:boolean}[]>(`${this.apiUrl}/receive/${receiverId}/${senderId}`);
}
}
