import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChambreServiceService {
private apiUrl='http://localhost:8080/api/chambres';
private apiNote='http://localhost:8080/api/notes'
private apiStars='http://localhost:8080/api/stars';
private dataStat="http://localhost:8080/api/dataStat";

  constructor(private http:HttpClient) { }

  addChambre(data:FormData):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/ajouter`,data);
  }
  getChambre():Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/disponibles`);
  }
  updateCambre(id:number,chambreData:FormData):Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/update/${id}`,chambreData);
  }
  updateDetail(id:number,chambreData:FormData):Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/mis/${id}`,chambreData);
  }
  disableChmbre(id:number,idU:number):Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/${id}/${idU}`);
  }
  activeChambre(id:number,idU:number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/dispo/${id}/${idU}`);
  }
  ListeChambreIndispo():Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/indisponible`);
  }
  setDispoChambre(id:number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/dispo/${id}`)
  }
   ajoutNotes(noteData:FormData):Observable<any>{
     return this.http.post<any>(`${this.apiNote}/create`,noteData);
   }
   getNotes():Observable<any[]>{
    return this.http.get<any[]>(`${this.apiNote}/show`);
   }
   updateSt(id:number,noteData:FormData):Observable<any>{
    return this.http.put<any>(`${this.apiNote}/updateSt/${id}`,noteData);
   }
   deleteNotes(id:number):Observable<any>{
    return this.http.delete<any>(`${this.apiNote}/${id}`);
   }
   getStars():Observable<any[]>{
    return this.http.get<any[]>(`${this.apiStars}/all`);
   }
   getBestRoom():Observable<any[]>{
    return this.http.get<any[]>(`${this.dataStat}/topChambre`);
   }
   
 
}
