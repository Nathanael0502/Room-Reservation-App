import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableLike } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashServiceService {
private apiUrl="http://localhost:8080/api/dashBoard";
private apiL="http://localhost:8080/api/dataStat";
  constructor(private http:HttpClient) { }
  getRevenus():Observable<number>{
    return this.http.get<number>(`${this.apiUrl}/revenus`);
  }
  getTotalUsers():Observable<number>{
    return this.http.get<number>(`${this.apiUrl}/users`);
  }
  getTotalRooms():Observable<number>{
    return this.http.get<number>(`${this.apiUrl}/rooms`);
  }
  getTotalR():Observable<number>{
    return this.http.get<number>(`${this.apiUrl}/countR`);
  }
  getTotalRT():Observable<number>{
    return this.http.get<number>(`${this.apiUrl}/countRT`);
  }
  getListR():Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/listR`);

  }
  getPayByDay():Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl+'/revenuByDay');
  }
  getTopCli():Observable<any[]>{
   return this.http.get<any[]>(`${this.apiL}/topCli`);
  }
  getBestCli():Observable<any>{
    return this.http.get<any>(`${this.apiL}/bestCli`);
   }
   gettoChambre():Observable<any[]>{
   return this.http.get<any[]>(`${this.apiL}/topChambre`);
   }
   getBestPay():Observable<any>{
    return this.http.get<any>(`${this.apiL}/bestPay`);
   }
   getTypChambre():Observable<any[]>{
    return this.http.get<any>(`${this.apiL}/typeChambre`);
   }
   getReservP():Observable<any[]>{
    return this.http.get<any[]>(`${this.apiL}/ReservStat`);
   }

}
