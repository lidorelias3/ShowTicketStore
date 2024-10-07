import { Injectable } from '@angular/core';
import * as $ from 'jquery';
import { Observable, Subject } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { authenticatedAjax } from './ajax.util';


@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  constructor() { }

  getAllUsers(): Observable<any> {
    var subject = new Subject<any>()
    authenticatedAjax({
      type: 'GET',
      url: 'http://localhost:3000/api/users/',
      async: true,
      success: function (data: any) {
        subject.next(data)
      },
      error: function (data: any) {
        subject.next(data)
      }
    });
    return subject.asObservable()
  }

  getUserByID(id: string): Observable<any> {
    var subject = new Subject<any>()
    authenticatedAjax({
      type: 'GET',
      url: `http://localhost:3000/api/users/${id}`,
      async: true,
      success: function (data: any) {
        subject.next(data)
      },
      error: function (data: any) {
        subject.next(data)
      }
    });
    return subject.asObservable()
  }

  deleteUser(id: string) {
    var subject = new Subject<any>()
    authenticatedAjax({
      type: 'DELETE',
      url: `http://localhost:3000/api/users/${id}`,
      async: true,
      success: function (data: any) {
        subject.next(data)
      },
      error: function (data: any) {
        subject.next(data)
      }
    });
    return subject.asObservable()
  }

  updateUser(user: User): Observable<any> {
    var subject = new Subject<any>()
    authenticatedAjax({
      type: "PUT",
      url: `http://localhost:3000/api/users/${user._id}`,
      data: user,
      async: true,
      success: function (data: any) {
        subject.next(data)
      },
      error: function (data: any) {
        subject.next(data)
      }
    });

    return subject.asObservable()
  }
}
