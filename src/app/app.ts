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
   this.routee.navigate(['/Login'])
  }
  protected readonly title = signal('SmartExpenceTracker');


}
