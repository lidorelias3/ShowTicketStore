import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  register(user: User): Observable<any> {
    var settings = {
      "url": "http://127.0.0.1:3000/api/auth/register",
      "method": "POST",
      "timeout": 1000,
      "headers": {
        "Content-Type": "application/json"
      },
      "data": JSON.stringify({
        "email": user.email,
        "password": user.password,
        "firstName": user.firstName,
        "lastName": user.lastName,
        "age": user.age,
        "gender" : user.gender
      }),
    };
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.httpClient.post<any>(settings.url, settings.data, httpOptions)
  }


  login(user: User): Observable<{success: boolean, message: User, error: string}> {
    var settings = {
      "url": "http://127.0.0.1:3000/api/auth/login",
      "method": "POST",
      "timeout": 1000,
      "headers": {
        "Content-Type": "application/json"
      },
      "data": JSON.stringify({
        "email": user.email,
        "password": user.password,
      }),
    };
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.httpClient.post<any>(settings.url, settings.data, httpOptions)
  }
}
