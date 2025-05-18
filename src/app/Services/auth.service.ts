
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 constructor(private router : Router) { }

  isAuthorized = false

  authentificated = signal(false)

  logIn(){
    this.isAuthorized = true
    this.authentificated.set(true)
  }

  logOut(){
    this.isAuthorized = false
    this.authentificated.set(false)
    localStorage.removeItem('token')
    this.router.navigateByUrl('logInNewUser')
  }
  isLogedIn(){
   return this.isAuthorized
  }

  cheackToken(){
     if(localStorage.getItem('token')){
         this.isAuthorized = true
     }
     else{
      this.isAuthorized = false
     }
  }
}
