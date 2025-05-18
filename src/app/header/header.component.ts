import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { SignalService } from '../Services/signal.service';


@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

    active = "activeLink"


      constructor(private sig : SignalService, private authNew : AuthService){
      effect(() => {
        this.user = this.sig.userName()
        this.user != "" ? this.isAuth = true : this.isAuth=false
         this.isAuthNew =  this.authNew.authentificated()
      })
    }

    logOut(){
      this.authNew.logOut()
      
    }

    isAuthNew = false

  isAuth = false   

   activeRouteClass = "active"



   user = ""
}
