import { Component } from '@angular/core';
import { RegisterUser } from '../register/register.component';
import { UserService } from '../Services/product/product.service';
import { AuthService } from '../Services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
      constructor(private api : UserService, private auth  : AuthService){}
  
  
  
    registerUser : RegisterUser = new RegisterUser
  
    login(){
        this.api.logIn(this.registerUser).subscribe(resp => {
          console.log(resp)
          localStorage.setItem("token", resp.token)
          this.auth.logIn()
        })
    }
}
