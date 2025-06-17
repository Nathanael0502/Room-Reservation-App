import { Component, OnInit } from '@angular/core';
import { ChatBotSService } from '../chat-bot-s.service';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
@Component({
  selector: 'app-data-stat',
  imports: [BaseChartDirective],
  templateUrl: './data-stat.component.html',
  styleUrl: './data-stat.component.css'
})
export class DataStatComponent implements OnInit{
constructor(private stat:ChatBotSService){}
idCli:string|null=sessionStorage.getItem('id');
dataDash={
  ttR:0, 
  ttP:0
}
public doughnutChartLabels: string[] = [];
  public doughnutChartData: any[] = [];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartOptions: ChartOptions = {
    responsive: true,
  };
ngOnInit(): void {
    this.getTotalR();
    this.loadPayments() ;
    this.loadReservation();
}
public barChartOptions: ChartOptions = {
  responsive: true,
  maintainAspectRatio:false,
  plugins:{
    title:{
      font:{
        size:24
      }
    }
    },
  scales:{
   
    y:{
      ticks:{
        font:{
          size:14
        }
      }
    },
    x:{
    ticks:{
      font:{
        size:14
      }
    }
    }
  }
};
public barChartLabels: string[] = [];
public barChartData: any[] = [
  { data: [], label: 'Reservation par date' }
];
public barChartType: ChartType = 'bar';
public linearChartData:ChartData<'line'>={
  labels:[],
  datasets:[
    {
      data:[],
      label:'Paiement par date(Ar)',
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

getTotalR(){
  if(this.idCli){
    this.stat.receiveTotalR(parseInt(this.idCli)).subscribe(data=>this.dataDash.ttR=data);
     this.stat.receivelistPay(parseInt(this.idCli)).subscribe(data=>this.dataDash.ttP=data);
  }
}

loadPayments() {
  if(this.idCli){
  this.stat.receiveRList(parseInt(this.idCli)).subscribe(data => {
    const groupedData: { [date: string]: number } = {};
    console.log(data)
    data.forEach(payment => {
      const date = payment.dateReservation; // Assure-toi que c'est bien le format date
      const amount = payment.nbReservations; // Montant du paiement

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

loadReservation(){
  if(this.idCli){
  this.stat.receivePayList(parseInt(this.idCli)).subscribe(data => {
    console.log(data)
    this.linearChartData.labels=data.map((item:any)=>item.datep);
    this.linearChartData.datasets[0].data=data.map((item:any)=>item.total);
    const groupedData: { [date: string]: number } = {};

    data.forEach(payment => {
      const date = payment.datep; // Assure-toi que c'est bien une date au format string
      const amount = payment.total; // Montant du paiement

      if (groupedData[date]) {
        groupedData[date] += amount;
      } else {
        groupedData[date] = amount;
      }
    });
    console.log(groupedData);
    this.doughnutChartLabels = Object.keys(groupedData);
    this.doughnutChartData = [{data:Object.values(groupedData)}];
  });
}
}
}
