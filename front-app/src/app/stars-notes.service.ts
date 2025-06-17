import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StarsNotesService {

  constructor(private http:HttpClient) { }
private apiUrl="http://localhost:8080/api/stars";
  addOrUpdateStars(formdata:FormData):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/add`,formdata);
  }
  getStars(id:number):Observable<any>{
    return this.http.get(`${this.apiUrl}/get/${id}`);
  }

}
