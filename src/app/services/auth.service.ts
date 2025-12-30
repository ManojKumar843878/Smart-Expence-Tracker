import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private key = 'currentUser';
    private loginvalue: boolean = false;
    private sighnvalue: boolean = false;

    login(email: any, password: any): boolean {
        if (email && password) {
            localStorage.setItem('isLoggedIn', 'true');
            // this.loginvalue = true;
            return true;
        }
        return false;
        // return this.loginvalue
    }

    signup(email: any, password: any): boolean {
        if (email && password) {
            localStorage.setItem(this.key, JSON.stringify(email));
            this.sighnvalue = true;
        }
        return this.sighnvalue
    }

    logOut() {
        localStorage.removeItem('isLoggedIn');

    }
    isLoggedIn() {
        return localStorage.getItem('isLoggedIn') === 'true';
    }
}