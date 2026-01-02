import { Component, OnInit } from '@angular/core';
import { ExpenceService, Expense } from '../../services/expense.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './expenses.html',
  styleUrls: ['./expenses.css'],
})
export class ExpensesComponrnt implements OnInit {
  expenses: Expense[] = [];
  editingId: number | null = null;
  ExpenceTotal: any;
  ExpenceAvgTotal: number = 0;

  FilterExpence: Expense[] = [];

  selectedCategory: string = '';
  selectedMonth: string = '';
  selectedYear: string = '';
  selectedDate: string = '';
  high: any;
  low: any;
  amountOrder: string = '';
  years:any;
  Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Actober", "November", "December"]

  form: any = {
    amount: null,
    category: '',
    date:'',
    description: ''
  };

  categories = ['Groceries', 'Transport', 'Entertainment', 'Health', 'Education', 'Others'];
  constructor(private experseService: ExpenceService) { }

  ngOnInit() {
    this.expenses = this.experseService.getExpenses();
    this.FilterExpence = this.expenses;
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
    this.expenses = this.experseService.getExpenses();
    this.FilterExpence = this.expenses;
    this.ExpenceTotal = this.expenses.reduce((sum, e) => sum + e.amount, 0)
    this.ExpenceAvgTotal = this.ExpenceTotal / this.expenses.length
    console.log(" this.expenses----", this.expenses);
    this.years = [
      ...new Set(
        this.expenses.map(e => new Date(e.date).getFullYear())
      )
    ];
  }
  edit(expense: Expense) {
    this.form = {
      amount: expense.amount,
      catogory: expense.catogory,
      date: expense.date,
      description: expense.description
    }
    this.editingId = expense.id;
  }
  delete(exp: Expense) {
    if (confirm("Are you sure You want to delete this expense?")) {
      this.experseService.deleteExpense(exp.id);
      this.loadExpenses();
    }
  }

  cancelEdit() {
    this.editingId = null;
    this.resetForm();
  }

  resetForm() {
    this.form = {
      amount: null,
      catogory: '',
      date: '',
      description: ''
    };
  }

  applyFilters() {
    this.FilterExpence = this.expenses.filter(exp => {

      if (this.selectedCategory && exp.catogory != this.selectedCategory) {
        return false;
      }
      if (this.selectedYear && new Date(exp.date).getFullYear() !== +this.selectedYear) {
        console.log("new Date(exp.date).getFullYear()", new Date(exp.date).getFullYear())
        console.log("this.selectedYear", this.selectedYear)
        return false;
      }
      if (this.selectedMonth && new Date(exp.date).getMonth().toString() !== this.selectedMonth) {
        console.log("new Date(exp.date).getFullYear()", new Date(exp.date).getMonth())
        console.log("this.selectedYear", this.selectedMonth)
        return false;
      }
      if (this.selectedDate && exp.date !== this.selectedDate) {
        console.log("new Date(exp.date).getFullYear()", exp.date)
        console.log("this.selectedYear", this.selectedDate)
        return false;
      }


      return true;
    })

    if (this.amountOrder == "high") {
      this.FilterExpence.sort((a, b) => b.amount - a.amount)
    }
    if (this.amountOrder == "low") {
      this.FilterExpence.sort((a, b) => a.amount - b.amount);
    }


  }

}
/*
import { Component, OnInit } from '@angular/core';
import { ExpenceService, Expense } from '../../services/expense.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './expenses.html',
  styleUrls: ['./expenses.css'],
})
export class ExpensesComponrnt implements OnInit {

  expenses: Expense[] = [];           // ALL DATA
  filteredExpenses: Expense[] = [];   // TABLE DATA

  editingId: number | null = null;

  ExpenceTotal = 0;
  ExpenceAvgTotal = 0;

  form: any = {
    amount: null,
    catogory: '',
    date: '',
    description: ''
  };

  categories = ['Groceries', 'Transport', 'Entertainment', 'Health', 'Education', 'Others'];

  // FILTER VARIABLES
  selectedCategory = '';
  selectedMonth = '';
  selectedYear = '';
  amountOrder = '';

  constructor(private experseService: ExpenceService) {}

  ngOnInit(): void {
    this.resetForm();
    this.loadExpenses();
  }

  loadExpenses(): void {
    this.expenses = this.experseService.getExpenses();
    this.applyFilters();
    this.calculateTotals();
  }

  addOrUpdate(): void {
    if (!this.form.amount || !this.form.catogory || !this.form.date) {
      alert('Please fill Amount, Category and Date');
      return;
    }

    if (this.editingId) {
      this.experseService.updateExpense({
        id: this.editingId,
        ...this.form
      });
    } else {
      this.experseService.addExpenses(this.form);
    }

    this.resetForm();
    this.editingId = null;
    this.loadExpenses();
  }

  edit(expense: Expense): void {
    this.form = { ...expense };
    this.editingId = expense.id;
  }

  delete(exp: Expense): void {
    if (confirm('Are you sure you want to delete this expense?')) {
      this.experseService.deleteExpense(exp.id);
      this.loadExpenses();
    }
  }

  cancelEdit(): void {
    this.editingId = null;
    this.resetForm();
  }

  resetForm(): void {
    this.form = {
      amount: null,
      catogory: '',
      date: '',
      description: ''
    };
  }

  // ⭐ MAIN FILTER LOGIC
  applyFilters(): void {
    this.filteredExpenses = this.expenses.filter(exp => {

      if (this.selectedCategory &&
          exp.catogory !== this.selectedCategory) {
        return false;
      }

      if (this.selectedMonth !== '' &&
          new Date(exp.date).getMonth() !== +this.selectedMonth) {
        return false;
      }

      if (this.selectedYear &&
          new Date(exp.date).getFullYear() !== +this.selectedYear) {
        return false;
      }

      return true;
    });

    if (this.amountOrder === 'high') {
      this.filteredExpenses.sort((a, b) => b.amount - a.amount);
    }

    if (this.amountOrder === 'low') {
      this.filteredExpenses.sort((a, b) => a.amount - b.amount);
    }
  }

  calculateTotals(): void {
    this.ExpenceTotal = this.filteredExpenses.reduce(
      (sum, e) => sum + e.amount, 0
    );

    this.ExpenceAvgTotal =
      this.filteredExpenses.length > 0
        ? this.ExpenceTotal / this.filteredExpenses.length
        : 0;
  }
}

*/