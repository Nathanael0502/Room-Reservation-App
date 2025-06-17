import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {

  constructor(private http:HttpClient) { }
private apiUrl="http://localhost:8080/api/client";
private api="http://localhost:8080/api/notification";
private apiL="http://localhost:8080/api/historiques";
getDataClient():Observable<any[]>{
return this.http.get<any[]>(`${this.apiUrl}/affichage`);
}
getClientById(id:string):Observable<any>{
  return this.http.get<any>(`${this.apiUrl}/getCli/${id}`);
}
postDataClient(data:FormData):Observable<any>{
  return this.http.post<any>(`${this.apiUrl}/ajout`,data);
}

deleteClient(id:number,idU:number):Observable<string>{
  return this.http.delete<string>(`${this.apiUrl}/${id}/${idU}`);
}
updateClient(id:number,formd:FormData):Observable<string>{
  return this.http.put<string>(`${this.apiUrl}/${id}`,formd);
}
updateCli(id:number,formd:FormData):Observable<string>{
  return this.http.put<string>(`${this.apiUrl}/NoFile/${id}`,formd);
}
showNotification(id:number):Observable<any[]>{
return this.http.get<any[]>(`${this.api}/listeById/${id}`)
}
deleteNotification(id:number):Observable<any>{
  return this.http.delete<any>(`${this.api}/move/${id}`);
}
showHistorique(id:number):Observable<any[]>{
   return this.http.get<any[]>(`${this.apiL}/${id}`);
}
deletehistorique(id:number):Observable<string>{
  return this.http.delete<string>(`${this.apiL}/${id}`);
}
EnvoiNotification(formData:FormData):Observable<any>{
return this.http.post<any>(`${this.api}/ajout`,formData);
}
}
