import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthServise {


private http = inject(HttpClient);

private  backendURL = 'http://localhost:8080/api/auth';

    login (loginData:any){

  return this.http.post(`${this.backendURL}/login`,loginData);
    }

  constructor() {
  }
}
