import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../Models/UserModel';

@Injectable({
  providedIn: 'root'
})
export class UserMasterService {

  constructor(private http: HttpClient) {
  }
  apiUrl = "http://localhost:8080/users";

  header = {
    headers: new HttpHeaders()
      .set('Authorization', `Basic ${localStorage.getItem("auth")}`)
  }
  GetAllUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.apiUrl, this.header);
  }

  GetUserById(userId: any) {
    return this.http.get(this.apiUrl + "/" + userId, this.header);
  }
}
