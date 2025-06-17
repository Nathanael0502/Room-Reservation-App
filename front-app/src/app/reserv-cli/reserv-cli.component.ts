import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginServiceService } from '../service/loginS/login-service.service';
import { ReservationSService } from '../service/reservation-s.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-reserv-cli',
  imports: [CommonModule,FormsModule,LucideAngularModule],
  templateUrl: './reserv-cli.component.html',
  styleUrl: './reserv-cli.component.css'
})
export class ReservCliComponent implements OnInit {
  constructor(private infoCli:LoginServiceService,private reservation:ReservationSService){}
listR:any[]=[]
idB:string|null='';
id='';
  
  ngOnInit(): void {
    this.getResrvation()
   
  }

  getResrvation(){
    this.idB=this.infoCli.getUserId();
  
     if(this.idB){
      this.id=this.idB;
      console.log(this.id)
     }
       this.reservation.ListReservation().subscribe(data=>{
         this.listR=data;
       })
  }
  deleteReservation(id:number){
       this.reservation.DeleteReservation(id).subscribe(response=>{
        console.log(response);
       
        this.getResrvation();
       })
       window.location.reload();
  }

}
