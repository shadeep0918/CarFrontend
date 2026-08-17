import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient); //httpclient connect with service

  private backendUrl = 'http://localhost:8080/api/auth';  //backend URL

  constructor() {
  }

  //This is login function
  login(loginData:any){

    return this.http.post(`${this.backendUrl}/login`,loginData);

  }


  register(registerData: any){

    return this.http.post(`${this.backendUrl}/register`,registerData);
  }


}
