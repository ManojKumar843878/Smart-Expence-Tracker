import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ FormsModule , CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {

  email='';
  password='';
  error='';

  constructor( private auth:AuthService, private router :Router){}
  
  login(){
    if(this.auth.login(this.email,this.password)){
      this.router.navigate(['/Dashboard']);
    }else{
      this.error =" please enter  email and password "
    }
  }

}
