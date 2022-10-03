import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

  }

  ProceedLogin(inputData: any) {
    console.log(inputData.auth)
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Basic ${inputData.auth}`)
    }
    return this.http.post('http://localhost:8080/login', {}, header)
  }

  IsLoogedIn() {
    return localStorage.getItem("auth") != null;
  }

  GetAuth() {
    return localStorage.getItem("auth") != null ? localStorage.getItem("auth") : '';
  }

  Registration(inputdata: any) {
    return this.http.post('http://localhost:8080/register', inputdata);
  }
}
