import { Component } from '@angular/core';
import { ExpenceService } from '../../services/expense.service';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-dashboard',
  imports: [
    RouterModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent {

  expenses : any []=[];
  total =0;
  wallet=1000;
  
  constructor(private _expenseService : ExpenceService , private router :Router , private auth: AuthService){}

  ngOnInit(){
    this.expenses=this._expenseService.getExpenses()
    this.total=this.expenses.reduce((sum,e)=> sum+e.amount,0);
    this.wallet=this.wallet- this.total;
  }
   goToExpense(){
    this.router.navigate(['/Expence'])
   }

    logout() {
    this.auth.logOut();
    this.router.navigate(['/Login']);
  }
}
