import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ModelClients } from '../../models/ModelClients';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http:HttpClient,private router:Router) { }
private apiUrl:string="http://localhost:8080/api/auth/login";
  login(email:string,password:string):Observable<any>{
    return this.http.post(this.apiUrl,{email,password}).pipe(
      tap((response:any)=>{
        if(typeof window!=='undefined' && sessionStorage){
          sessionStorage.setItem('token',response.token);
          sessionStorage.setItem('role',response.role);
          sessionStorage.setItem('id',response.id);
        
        }

      })
    );
  }
  
private api:string="http://localhost:8080/api/client/getCli";

findCliById(id:number):Observable<ModelClients>{
   return this.http.get<ModelClients>(`${this.api}/${id}`);
}
  
  getUserId():string | null{
    if(typeof window!=='undefined' && sessionStorage){
    return sessionStorage.getItem('id');
    }else{
      return '0';
    }
  }
  
  getUsertoken():string | null{
    if(typeof window!=='undefined' && sessionStorage){
    return sessionStorage.getItem('token');
  }else{
    return '0';
  }
  }
  getUserRole():string | null{
    if(typeof window!=='undefined' && sessionStorage){
    return sessionStorage.getItem('role');
  }else{
    return '0';
  }
  }

  LogOut(){
    if(typeof window!=='undefined' && sessionStorage){
    sessionStorage.clear();
    this.router.navigate(['/login']);
    }
  }

}
