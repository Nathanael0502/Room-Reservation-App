import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClientServiceService } from '../../service/clientS/client-service.service';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-choix-pers',
  imports: [CommonModule,FormsModule,RouterLink,LucideAngularModule],
  templateUrl: './choix-pers.component.html',
  styleUrl: './choix-pers.component.css'
})
export class ChoixPersComponent implements OnInit{
tab:any[]=[];
senderId:string|null=null;
role:string|null=null;
searchText='';
constructor(private clientS:ClientServiceService){}
ngOnInit(): void {
    this.getPersonne()
    this.senderId= sessionStorage.getItem('id');
    this.role=sessionStorage.getItem('role');
}
getPersonne(){
  this.clientS.getDataClient().subscribe(data=>{
    this.tab=data;
  });
}
retourButton(){
  if(this.role=='user'){
  window.location.href="http://localhost:4200/userClient";
  }else{
    window.location.href="http://localhost:4200/dashboard";
  }
}
get filterData(){
  return this.tab.filter((row)=>
    row.nom.toLowerCase().includes(this.searchText.toLowerCase()) ||  
  row.prenom.toLowerCase().includes(this.searchText.toLowerCase()))
}
}
