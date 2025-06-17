import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PaiementServiceService } from '../service/paiementS/paiement-service.service';
import { LoginServiceService } from '../service/loginS/login-service.service';

@Component({
  selector: 'app-pay-cli',
  imports: [CommonModule],
  templateUrl: './pay-cli.component.html',
  styleUrl: './pay-cli.component.css'
})
export class PayCliComponent implements OnInit{
   tabPayCli:any[]=[];

   ngOnInit(): void {
      this.idb=this.recupId.getUserId();
      if(this.idb){
        this.ida=parseInt(this.idb);
      }
   this.getPay();
   }
   constructor(private serviceCli:PaiementServiceService,private recupId:LoginServiceService){}
 ida=0;
 idb:string|null='';
 
 getPay(){
  this.serviceCli.GetPaiement().subscribe(data=>{
    this.tabPayCli=data;
  })
 }

}
