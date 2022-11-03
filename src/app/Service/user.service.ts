import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

  }
  header = {
    headers: new HttpHeaders()
      .set('Authorization', `Basic ${localStorage.getItem("auth")}`)
  }
  ProceedLogin(inputData: any) {
    console.log(inputData.auth)
    this.header = {
      headers: new HttpHeaders()
        .set('Authorization', `Basic ${inputData.auth}`)
    }
    return this.http.post('http://localhost:8080/login', {}, this.header)
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

  GetMe() {
    return this.http.get(`http://localhost:8080/me`, this.header);
  }

}
