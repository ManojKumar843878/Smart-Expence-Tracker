import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { SignupComponent } from './pages/signup/signup';
import { ExpensesComponrnt } from './pages/expenses/expenses';
import { DashboardComponent } from './pages/dashboard/dashboard';

export const routes: Routes = [
    { path : "" , redirectTo:"Login" ,pathMatch:"full"},
    { path:"Login", component: LoginComponent },
    { path :"Signup " ,component: SignupComponent},
    { path:"Expence",component:ExpensesComponrnt},
    { path : "Dashboard", component:DashboardComponent},
    { path: '**', redirectTo: '/Dashboard' }

];
