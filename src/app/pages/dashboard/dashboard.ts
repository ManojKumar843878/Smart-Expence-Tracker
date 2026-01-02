import { Component, OnInit } from '@angular/core';
import { ExpenceService, Expense } from '../../services/expense.service';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Chart from 'chart.js/auto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit {

  expenses: Expense[] = [];

  total = 0;
 // avgPerMonth = 0;
  topCategory = '-';
 // thisMonthTotal = 0;

  recentExpenses: Expense[] = [];

  monthlyChart: any;
  categoryChart: any;
  avgPerMonth: number = 0;
  thisMonthTotal: number = 0;

  constructor(
    private expenseService: ExpenceService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.expenses = this.expenseService.getExpenses();

    this.calculateSummary();
    this.loadRecentExpenses();
    this.renderMonthlyChart();
    this.renderCategoryChart();
  }

  // ===== SUMMARY =====
  calculateSummary(): void {
    this.total = this.expenses.reduce((sum, e) => sum + e.amount, 0);

    const months = new Set(
      this.expenses.map(e => new Date(e.date).getMonth())
    );
    this.avgPerMonth = months.size ? this.total / months.size : 0;

    // Top Category
    const categoryMap: any = {};
    this.expenses.forEach(e => {
      categoryMap[e.catogory] =
        (categoryMap[e.catogory] || 0) + e.amount;
    });

    this.topCategory = Object.keys(categoryMap)
      .reduce((a, b) => categoryMap[a] > categoryMap[b] ? a : b, '-');

    // This Month
    const currentMonth = new Date().getMonth();
    this.thisMonthTotal = this.expenses
      .filter(e => new Date(e.date).getMonth() === currentMonth)
      .reduce((sum, e) => sum + e.amount, 0);
  }

  // ===== RECENT =====
  loadRecentExpenses(): void {
    this.recentExpenses = [...this.expenses]
      .sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      )
      .slice(0, 5);
  }

  // ===== BAR CHART =====
  renderMonthlyChart(): void {
    const monthMap: any = {};

    this.expenses.forEach(e => {
      const month = new Date(e.date).toLocaleString('default', { month: 'short' });
      monthMap[month] = (monthMap[month] || 0) + e.amount;
    });

    this.monthlyChart = new Chart('monthlyChart', {
      type: 'bar',
      data: {
        labels: Object.keys(monthMap),
        datasets: [{
          label: 'Expenses',
          data: Object.values(monthMap),
        }]
      }
    });
  }

  // ===== PIE CHART =====
  renderCategoryChart(): void {
    const categoryMap: any = {};

    this.expenses.forEach(e => {
      categoryMap[e.catogory] =
        (categoryMap[e.catogory] || 0) + e.amount;
    });

    this.categoryChart = new Chart('categoryChart', {
      type: 'pie',
      data: {
        labels: Object.keys(categoryMap),
        datasets: [{
          data: Object.values(categoryMap),
        }]
      }
    });
  }

  // ===== ACTIONS =====
  goToExpense(): void {
    this.router.navigate(['/Expence']);
  }

  logout(): void {
    this.auth.logOut();
    this.router.navigate(['/Login']);
  }
}
