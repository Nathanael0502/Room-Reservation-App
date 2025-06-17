import { Component, Input } from '@angular/core';
import { EmailSService } from '../email-s.service';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-facture',
  imports: [FormsModule,LucideAngularModule],
  templateUrl: './facture.component.html',
  styleUrl: './facture.component.css'
})
export class FactureComponent{
@Input() dataFac:any[]=[];

searchText='';
constructor(private factService:EmailSService){}
get filterData(){
  return this.dataFac.filter(fac=>fac.client.nom.toLowerCase().includes(this.searchText.toLowerCase())||
  fac.client.prenom.toLowerCase().includes(this.searchText.toLowerCase())||
  fac.client.email.toLowerCase().includes(this.searchText.toLowerCase())||
  fac.client.nom.toLowerCase().includes(this.searchText.toLowerCase())||
  fac.fileName.toLowerCase().includes(this.searchText.toLowerCase())||
  fac.fileType.toLowerCase().includes(this.searchText.toLowerCase())
)
}

deleteFac(id:number){

  this.factService.deletePJ(id).subscribe(response=>{
    alert(response.message);
    window.location.reload();
})
}
}
