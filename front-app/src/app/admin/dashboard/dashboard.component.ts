
import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { BarNavComponent } from "../../component/bar-nav/bar-nav.component";
import { DashServiceService } from '../../dash/dash-service.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions, ChartType } from 'chart.js';



@Component({
  selector: 'app-dashboard',
  imports: [ CommonModule, BarNavComponent,BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  public linearChartData:ChartData<'line'>={
    labels:[],
    datasets:[
      {
        data:[],
        label:'Revenu par jour(Ar)',
        borderColor:'blue',
        backgroundColor:'rgba(0,123,255,0.3)',
        fill:'origin'
      }
    ]
  };
  public lineChartType:ChartType='line';
  public lineChartOptions:ChartOptions={
    responsive:true
  }
constructor(private dash:DashServiceService,private star:DashServiceService){}
modelDash={
  revenus:0,rooms:0,users:0,reservation:0,reservRT:0
};
tabReservT:any[]=[];
ngOnInit(): void {
  this.getReserv();
  this.getListResvTD();
  this.getRevenu();
  this.getRooms();
  this.getUsers();
  this.getReservTD();
  this.dash.getPayByDay().subscribe(data=>{
    console.log(data)
    this.linearChartData.labels=data.map((item:any)=>item.datep);
    this.linearChartData.datasets[0].data=data.map((item:any)=>item.total);
  })
  this.loadPayments();
}
getRevenu(){
this.dash.getRevenus().subscribe(total=>{
  this.modelDash.revenus=total;
})
}
getRooms(){
  this.dash.getTotalRooms().subscribe(total=>{
    this.modelDash.rooms=total;
  })
}
getUsers(){
  this.dash.getTotalUsers().subscribe(total=>{
    this.modelDash.users=total;
  })
}
getReserv(){
  this.dash.getTotalR().subscribe(total=>{
    this.modelDash.reservation=total;
  })
}
getReservTD(){
  this.dash.getTotalRT().subscribe(total=>{
    this.modelDash.reservRT=total;
  })
}
getListResvTD(){
  this.dash.getListR().subscribe(data=>{
    this.tabReservT=data;
  })
}
public barChartOptions: ChartOptions = {
  responsive: true,
};
public barChartLabels: string[] = [];
public barChartData: any[] = [
  { data: [], label: 'Nombre de reservations par date' }
];
public barChartType: ChartType = 'bar';
loadPayments() {
  this.star.getReservP().subscribe(data => {
    const groupedData: { [date: string]: number } = {};

    data.forEach(payment => {
      const date = payment.date // Assure-toi que c'est bien le format date
      const amount = payment.total; // Montant du paiement

      if (groupedData[date]) {
        groupedData[date] += amount;
      } else {
        groupedData[date] = amount;
      }
    });

    this.barChartLabels = Object.keys(groupedData);
    this.barChartData[0].data = Object.values(groupedData);
  });
}


}
