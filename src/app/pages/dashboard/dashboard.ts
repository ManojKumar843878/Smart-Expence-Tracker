import { Component } from '@angular/core';
import { ExpenceService } from '../../services/expense.service';
import { Router, RouterModule } from '@angular/router';

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
  
  constructor(private _expenseService : ExpenceService , private route :Router){}

  ngOnInit(){
    this.expenses=this._expenseService.getExpenses()
    this.total=this.expenses.reduce((sum,e)=> sum+e.amount,0);
    this.wallet=this.wallet- this.total;
  }
   goToExpense(){
    this.route.navigate(['/Expence'])
   }
}
