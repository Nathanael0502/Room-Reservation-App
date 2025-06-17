import { Component, OnInit } from '@angular/core';
import { EmailSService } from '../email-s.service';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-facture-cli',
  imports: [LucideAngularModule,FormsModule,CommonModule],
  templateUrl: './facture-cli.component.html',
  styleUrl: './facture-cli.component.css'
})
export class FactureCliComponent implements OnInit{
    constructor(private message:EmailSService){}
idCli=sessionStorage.getItem('id');
 ngOnInit(): void {
     this.getMessage();
 }
 tabCli:any[]=[];
 searchText="";
getMessage(){
this.message.getPJ().subscribe(data=>
  this.tabCli=data
)
}
get FilterData(){
  return this.tabCli.filter((tab)=>tab.fileName.toLowerCase().includes(this.searchText.toLowerCase())
|| tab.fileType.toLowerCase().includes(this.searchText.toLowerCase()))
}
downLoad(id:number){
  this.message.dowloadPJ(id).subscribe(response=>{
    console.log(response)
  })
}
}
