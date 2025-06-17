import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaiementServiceService {

  constructor(private http:HttpClient) { }

   private apiUrl="http://localhost:8080/api/paiements";

  AddPaiement(dataR:FormData):Observable<any>{
   return this.http.post<any>(`${this.apiUrl}/payer`,dataR)
  }

  GetPaiement():Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/voirPay`);
  }
  DeletePaiement(id:number,idU:number):Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/supprimer/${id}/${idU}`);
  }
  UpdatePaimement(id:number,dataR:FormData):Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/${id}`,dataR);
  }
}
