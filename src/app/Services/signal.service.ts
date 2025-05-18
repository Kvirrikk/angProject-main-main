import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignalService {

  constructor() { }


    dataAmount = signal(0)


  setDataAmount(amount : number){
    this.dataAmount.set(amount)
  }

  incrementDataAmount(){
    this.dataAmount.update(val => val+1)
  }

  decrementDataAmount(){
    this.dataAmount.update(val => val-1)
  }


  userName = signal("")

  setUserName(userName =""){
    this.userName.set(userName)
  }
}
