import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmailResponse } from './models/email.model';

@Injectable({
  providedIn: 'root'
})
export class EmailSService {
private apiUrl='http://localhost:8080/api/emails';
private apiP='http://localhost:8080/api/files';
  constructor(private http:HttpClient) { }
sendMail(formData:FormData):Observable<any>{
  return this.http.post(`${this.apiUrl}/send`,formData);
}
replyToEmail(response:EmailResponse):Observable<any>{
return this.http.post(`${this.apiUrl}/reply`,response)
}
getResponses(emailId:string):Observable<EmailResponse[]>{
return this.http.get<EmailResponse[]>(`${this.http}/${emailId}`);
}
postPJ(formData:FormData):Observable<any>{
return this.http.post<any>(`${this.apiP}/upload`,formData);
}
getPJ():Observable<any[]>{
  return this.http.get<any[]>(`${this.apiP}`);
}
dowloadPJ(id:number):Observable<any>{
  return this.http.get<any>(`${this.apiP}/${id}`);
}
deletePJ(id:number):Observable<any>{
  return this.http.delete<any>(`${this.apiP}/${id}`);
}
}
