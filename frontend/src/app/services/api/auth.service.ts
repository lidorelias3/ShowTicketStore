import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  register(user: User): Observable<any> {
    var body = JSON.stringify({
      "email": user.email,
      "password": user.password,
      "firstName": user.firstName,
      "lastName": user.lastName,
      "age": user.age,
      "gender": user.gender
    })

    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.httpClient.post<any>("http://localhost:3000/api/auth/register", body, httpOptions)
  }


  login(user: User): Observable<{ success: boolean, message: User, error: string }> {
    var body = JSON.stringify({
      "email": user.email,
      "password": user.password,
    })

    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.httpClient.post<any>("http://localhost:3000/api/auth/login", body, httpOptions)
  }
}
