

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../Services/auth.service';
import { FormsModule } from '@angular/forms';
import { UserService } from '../Services/product/product.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
     constructor(
      private api : UserService,
      private router : Router
    ){}



  registerUser : RegisterUser = new RegisterUser

register() {
  if (!this.registerUser.phoneNumber || !this.registerUser.password) {

    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: 'Please fill in all fields before signing up!'
    });
    return; 
  }

else {  
  this.api.register(this.registerUser).subscribe(
    resp => {
      console.log(resp);
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'Welcome aboard!',
        timer: 2000,
        showConfirmButton: false
      }).then(() => {

        this.router.navigate(['/home']);
      });
    },
    error => {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed!',
        text: 'Something went wrong, please try again.'
      });
    }
  );
  console.log(this.registerUser); 
}
}


}


export class RegisterUser {
  phoneNumber!: string  
  password!: string
  email: string  = ""
  firstName: string = ""
  lastName: string = ""
  role: string = ""
}



