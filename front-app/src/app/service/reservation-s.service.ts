import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationSService {
private apiUrl='http://localhost:8080/api/reservation'
  constructor(private http:HttpClient) { }

  ListReservation():Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/Liste`);
  }
  AddReservation(dataR:FormData):Observable<any>{
  return this.http.post<any>(`${this.apiUrl}/reserver`,dataR);
  }
  DeleteReservation(id:number):Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/supprimer/${id}`);
  }
  Modifierreservation(id:number,dataR:FormData):Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/modifier/${id}`,dataR);
  }
  ConfirmationReservation(id:number,dataR:FormData):Observable<any>
  {
    return this.http.put<any>(`${this.apiUrl}/confirmation/${id}`,dataR);

  }
  confirmReserv(id:number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/confirmer/${id}`);
  }
}
