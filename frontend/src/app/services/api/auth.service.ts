import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Observable, Subject } from 'rxjs';
import * as $ from 'jquery';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  register(user: User): Observable<any> {
    var body = JSON.stringify({
      "email": user.email,
      "password": user.password,
      "firstName": user.firstName,
      "lastName": user.lastName,
      "age": user.age,
      "gender": user.gender
    })
  
    var subject = new Subject<any>()
    $.ajax({
      type: "POST",
      url: `http://localhost:3000/api/auth/register`,
      contentType: "application/json",
      data: body,
      async: true,
      success: function (data) {
        subject.next(data)
      },
      error: function(data) {
        subject.next(data)
      }
    });

    return subject.asObservable()
  }


  login(user: User): Observable<{ success: boolean, detailes: any, error: string }> {
    var body = JSON.stringify({
      "email": user.email,
      "password": user.password,
    })

    var subject = new Subject<any>()
    $.ajax({
      type: "POST",
      url: `http://localhost:3000/api/auth/login`,
      contentType: "application/json",
      data: body,
      async: true,
      success: function (data) {
        subject.next(data)
      },
      error: function(data) {
        subject.next(data)
      }
    });
    return subject.asObservable()
  }

}
