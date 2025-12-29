import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class HeaderComponent {

  constructor(private router: Router, private authService : AuthService) { }

 // isLoggedIn = false;

  isLoggedIn():boolean{
   return this.authService.isLoggedIn()
  }

  logout() {
   this.authService.logOut();
    this.router.navigate(['/Login'])
  }
 // goToDashboard(){
 //   this.router.navigate(['/Dashboard'])
  //}
  goHome(){
    this.router.navigate(['/Dashboard'])
  }
  goToDashboard(){
    console.log('Dashboard button clicked - navigating to /Dashboard');
    this.router.navigate(['/Dashboard'])
  }
  goToExpenses(){
    console.log('Expenses button clicked - navigating to /Expenses');
    this.router.navigate(['/Expence'])
  }
}
