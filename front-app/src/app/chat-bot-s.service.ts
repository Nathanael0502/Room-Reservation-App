import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatBotSService {
private apiUrl="http://localhost:8080/api/chat";
private apiL="http://localhost:8080/api/dataStat";
  constructor(private http:HttpClient) { }

  sendMessage(userMessage:string):Observable<any>{
    return this.http.post(this.apiUrl,userMessage,{responseType:'text'});
  }

  receiveTotalR(id:number):Observable<number>{
    return this.http.get<number>(`${this.apiL}/totalReserve/${id}`)
  }
  receivelistPay(id:number):Observable<number>{
    return this.http.get<number>(`${this.apiL}/totalPCli/${id}`)
  }
  receivePayList(id:number):Observable<any[]>{
    return this.http.get<any[]>(`${this.apiL}/lisPayCli/${id}`);
  }
  receiveRList(id:number):Observable<any[]>{
    return this.http.get<any[]>(`${this.apiL}/listReservByCli/${id}`);
  }


}
