import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) { }
  ngOnInit(): void {
    this.email = "";
    this.password = "";
    this.error = '';
   this.router.navigate(['/Login']) 
  }

  login() {
    if (this.auth.login(this.email, this.password)) {
      this.router.navigate(['/Dashboard']);
    } else {
      this.error = " please enter  email and password "
    }
  }

  noAccount(){
    this.router.navigate(['/Signup']);
    console.log("this.router.navigate(['/Signup']);")
  }

}
