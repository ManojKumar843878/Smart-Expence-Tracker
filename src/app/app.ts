import { Router } from '@angular/router';
import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    HeaderComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  constructor(public routee: Router, private authService: AuthService) { }
  ngOnInit(): void {
    // Every time the app loads or refreshes
    if (this.authService.isLoggedIn()) {
      this.routee.navigate(['/Dashboard']);  // Go to Dashboard
    }
  }
  protected readonly title = signal('myApp');


}
