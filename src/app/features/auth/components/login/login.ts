import { Component,inject } from '@angular/core';
import{ FormsModule} from '@angular/forms';
import {  AuthServise } from '../../../../core/services/auth';
import { response } from 'express';


@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginObj: any = {
    email: '',
    password: '',
  };

  authService = inject(AuthServise);

  onLogin() {
    console.log('Sending data :', this.loginObj);

    this.authService.login(this.loginObj).subscribe({
      next :(response:any) =>{
        alert("log in successful ..!");
        console.log(response)
      },
      error: (error : any)=>{
        alert('login unsuccesfull ,please try again ..!');
        console.error(error);
    }
    });

  }
}
