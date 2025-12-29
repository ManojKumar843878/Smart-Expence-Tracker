import { Component, OnInit } from '@angular/core';
import { ExpenceService, Expense } from '../../services/expense.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-expenses',
  standalone:true,
  imports: [CommonModule, FormsModule],
  templateUrl: './expenses.html',
  styleUrls: ['./expenses.css'],
})
export class ExpensesComponrnt implements OnInit{
  expenses: Expense[] = [];
  editingId :number |null  = null;

  form :any  = {
    amount: null,
    category: '',
    date: '',
    description: ''
  };

  categories = ['Groceries', 'Transport', 'Entertainment', 'Health', 'Education', 'Others'];
  constructor(private experseService: ExpenceService) { }

  ngOnInit() {
    this.resetForm();
    this.loadExpenses();
  }

  loadExpenses() {
    this.expenses = this.experseService.getExpenses()
  }
 addOrUpdate() {
    if (this.form.amount <= 0 || !this.form.catogory || !this.form.date) {
      alert('please Fill AMount, Catogry and Date');
      return;
    }
 

    if (this.editingId) {
      this.experseService.updateExpense({
        id: this.editingId,
        amount: this.form.amount,
        catogory: this.form.catogory,
        date: this.form.date,
        description: this.form.description
      });
    } else {
      this.experseService.addExpenses({
        amount: this.form.amount,
        catogory: this.form.catogory,
        date: this.form.date,
        description: this.form.description
      })
    }

    this.resetForm();
    this.editingId = null;
    this.loadExpenses();
  }
  edit(expense : Expense){
    this.form ={
      amount : expense.amount,
      catogory :expense.catogory,
      date :expense.date,
      description :expense.description
    }
    this.editingId = expense.id;
  }
    delete(exp: Expense){
      if( confirm("Are you sure You want to delete this expense?")){
        this.experseService.deleteExpense(exp.id);
        this.loadExpenses();
      }
    }

    cancelEdit(){
      this.editingId=null;
      this.resetForm();
    }

    resetForm(){
    this.form = {
      amount: null,
      catogory: '',
      date:'',
      description: ''
    };
    }
}
