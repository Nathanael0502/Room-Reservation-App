import { Component } from '@angular/core';
import { ClientServiceService } from '../../service/clientS/client-service.service';
import { LoginServiceService } from '../../service/loginS/login-service.service';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { BarNavComponent } from '../bar-nav/bar-nav.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-history',
  imports: [LucideAngularModule,CommonModule,BarNavComponent,FormsModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
  constructor(private dataCli:ClientServiceService,private info:LoginServiceService){}
  tabhisto:any[]=[];
  searchText:string='';
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
  }

  get SearchHistory(){
    return this.tabhisto.filter(s=>s.historique.toLowerCase().includes(this.searchText.toLowerCase()))
  }
}
