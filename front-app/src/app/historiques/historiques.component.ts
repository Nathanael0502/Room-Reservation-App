import { Component, OnInit } from '@angular/core';
import { ClientServiceService } from '../service/clientS/client-service.service';
import { LoginServiceService } from '../service/loginS/login-service.service';
import { CommonModule, DatePipe } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';


@Component({
  selector: 'app-historiques',
  imports: [CommonModule,DatePipe,LucideAngularModule],
  templateUrl: './historiques.component.html',
  styleUrl: './historiques.component.css'
})
export class HistoriquesComponent implements OnInit {
constructor(private dataCli:ClientServiceService,private info:LoginServiceService){}
tabhisto:any[]=[];
id:string|null='';
ngOnInit(): void {
  this.id=this.info.getUserId();
  if(this.id){
    this.dataCli.showHistorique(parseInt(this.id)).subscribe(data=>{
       this.tabhisto=data;
       console.log(this.tabhisto)
    })
    
  }
}

DeleteHisto(idn:number){
this.dataCli.deletehistorique(idn).subscribe(response=>{
console.log(response);
})
window.location.reload();
}
}
