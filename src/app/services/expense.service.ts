import { ExpensesComponrnt } from './../pages/expenses/expenses';
 import { Injectable } from '@angular/core';

export interface Expense{
    id:number;
    amount:number;
    catogory:string;
    date:string;
    description:string;
}

 @Injectable({
    providedIn :'root'
 })

 export class ExpenceService{
     private Expenses : Expense[]=[];
     private key ='myExpenses';

     constructor(){ this.loadFormStorage()}
     

     getExpenses():Expense []{
        return this.Expenses;
     }

     addExpenses(expenses :Omit<Expense,'id'>){
        const newExpence ={...expenses , id: Date.now()};
        this.Expenses.push(newExpence)
     }

     updateExpense(updated :Expense){
        this.Expenses =this.Expenses.map(e => e.id === updated.id ?updated : e)
     }
     deleteExpense(id :number){
        this.Expenses=this.Expenses.filter(e=> e.id!==id)
        this.saveStorage();
     }
     saveStorage() {
        localStorage.setItem(this.key, JSON.stringify(this.Expenses))
     }
     loadFormStorage() {
       const data = localStorage.getItem(this.key);
       if(data){
        this.Expenses = JSON.parse(data)
       }
     }

 }