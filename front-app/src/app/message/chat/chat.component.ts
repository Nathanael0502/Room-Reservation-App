import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WebSocketService } from '../../servicesIP/web-soket-imp.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ClientServiceService } from '../../service/clientS/client-service.service';
import { LucideAngularModule } from 'lucide-angular';


@Component({
  imports:[CommonModule,FormsModule,LucideAngularModule,RouterLink],
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit,AfterViewChecked {

 messages:{sender:{id:number,photo:string},receiver:{id:number,photo:string},message:string,photo:string,test:boolean}[]=[];
newMessage:{sender:{id:number,photo:string},receiver:{id:number,photo:string},Message:string,photo:string,test:boolean}={sender:{id:0,photo:''},receiver:{id:0,photo:''},Message:'',photo:'',test:false};
  file:File|null=null;
  sender={id:0,email:'',nom:'',prenom:'',photo:''};
  receiver={id:0,email:'',nom:'',prenom:'',photo:''};
receiverId:string|null=null;
senderId:string|null=null;
searchText='';
constructor(private chatService: WebSocketService,private routeN:ActivatedRoute,
private ClientS:ClientServiceService
) {}
testImage=false;
  ngOnInit() {
   
    this.routeN.paramMap.subscribe(params=>{
      this.receiverId=params.get('id');
    })
    this.senderId= sessionStorage.getItem('id');
    if(this.receiverId && this.senderId){
      this.getUserById(this.senderId,this.receiverId);
      this.newMessage.receiver.id=Number(this.receiverId);
      this.newMessage.sender.id=Number(this.senderId);
      this.loadMessage(this.receiverId,this.senderId);
    }
   this.chatService.messages$.subscribe(message=>{
    this.messages.push(message);
    console.log(message)
   }) 
  }
ngAfterViewChecked(){
this.scrollToBottom();
}
  @ViewChild('Chate') Chate!:ElementRef;

 scrollToBottom():void{
    this.Chate.nativeElement.scrollTop=this.Chate.nativeElement.scrollHeight;
  }
  get filterData(){
    return this.messages.filter((row)=>
    row.message.toLowerCase().includes(this.searchText.toLowerCase()));
  }
  loadMessage(id1:string,id2:string){
   this.chatService.getMessage(id2,id1).subscribe(data=>{
   this.messages=data;
   console.log(data);
   });
  }
  onFileSelected(event:any){
    this.file=event.target.files[0];
    if(this.file){
      
      const imageUrl=URL.createObjectURL(this.file);
      this.newMessage.photo=imageUrl;
  
    }
  }
  getUserById(id:string,id2:string){
   this.ClientS.getClientById(id).subscribe(data=>{
     this.sender=data;
   });
   this.ClientS.getClientById(id2).subscribe(data=>{
    this.receiver=data;
  });
  }
sendMessage(){
  if(this.newMessage.Message=='' && this.file){
    this.newMessage.Message="photo";
    this.newMessage.test=true;
    this.chatService.sendMessage(this.newMessage);
    const formData=new FormData();
    formData.append('message',this.newMessage.Message);
    formData.append('receiverId',this.newMessage.receiver.id.toString());
    formData.append('senderId',this.newMessage.sender.id.toString());
    formData.append('photo',this.file);
      this.chatService.sendWithImg(formData).subscribe(response=>{
        console.log(response);
      })
      this.newMessage.Message="";
  }
    if(this.newMessage.Message!=''){
      if(this.file){
        this.newMessage.test=true;
    this.chatService.sendMessage(this.newMessage);
      }
      else{
        this.newMessage.test=false;
    this.chatService.sendMessage(this.newMessage);
      }
    const formData=new FormData();
    formData.append('message',this.newMessage.Message);
    formData.append('receiverId',this.newMessage.receiver.id.toString());
    formData.append('senderId',this.newMessage.sender.id.toString());
    if(this.file){
      formData.append('photo',this.file);
      this.chatService.sendWithImg(formData).subscribe(response=>{
        console.log(response);
       })
    }else{
       this.chatService.sendWithDB(formData).subscribe(response=>{
        console.log(response);
       })
    }
    }
this.scrollToBottom();
    this.newMessage.Message='';
    this.newMessage.photo='';
    this.file=null;
    
}
  
  
}
