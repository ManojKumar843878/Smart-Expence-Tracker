import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [ FormsModule , CommonModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class SignupComponent {

  email='';
  password='';
  error='';

  constructor( private authService:AuthService, private router:Router){}

  sighnUp(){
    if(this.authService.signup(this.email,this.password)){
      this.router.navigate(['/Dashboard']);
    }else{
      this.error=" Please fillssss Email and Password "
    }
  }


}
