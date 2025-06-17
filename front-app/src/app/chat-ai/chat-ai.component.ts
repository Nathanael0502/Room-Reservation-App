import { Component } from '@angular/core';
import { ChatBotSService } from '../chat-bot-s.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-ai',
  imports: [CommonModule,FormsModule],
  templateUrl: './chat-ai.component.html',
  styleUrl: './chat-ai.component.css'
})
export class ChatAIComponent {
userMessage:string='';
aiMessage:string='';
constructor(private chatService:ChatBotSService){}

send(){
  this.chatService.sendMessage(this.userMessage).subscribe(response=>{
    this.aiMessage=response;
  })
}
}
