import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginServiceService } from '../../service/loginS/login-service.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
email:string='';
password:string='';
constructor(private authService:LoginServiceService,private router:Router){}
testChamp=false;
login():void{
  this.authService.login(this.email,this.password).subscribe((response)=>{
    this.testChamp=false;
      if(response.role==="user"){
        this.router.navigate(['/userClient'])
       
      }else{
        window.location.href='/dashboard';
      }
    
  },error=>{
    alert("Email ou Mot de Passe incorrect");
    this.testChamp=true;
    console.error(error);

  }
)
}

}
