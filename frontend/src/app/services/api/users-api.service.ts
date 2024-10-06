import { Injectable } from '@angular/core';
import * as $ from 'jquery';
import { Observable, Subject } from 'rxjs';
import { User } from 'src/app/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  constructor() { }

  getAllUsers(): Observable<any> {
    var subject = new Subject<any>()
    $.get('http://localhost:3000/api/users/',
      function (data, _) {
        subject.next(data)
      }
    );

    return subject.asObservable()
  }

  getUserByID(id: string): Observable<any> {
    var subject = new Subject<any>()
    $.get(`http://localhost:3000/api/users/${id}`,
      function (data, _) {
        subject.next(data)
      }
    );

    return subject.asObservable()
  }

  deleteUser(id: string) {
    var subject = new Subject<any>()
    $.ajax({
      url: `http://localhost:3000/api/users/${id}`  ,
      type: 'DELETE',
      async: true,
      success: function (result) {
        subject.next(result)
      }
    });
    return subject.asObservable()
  }

  updateUser(user: User): Observable<any> {
    var subject = new Subject<any>()
    $.ajax({
      type: "PUT",
      url: `http://localhost:3000/api/users/${user.id}`,
      contentType: "application/json",
      data: JSON.stringify(user),
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
