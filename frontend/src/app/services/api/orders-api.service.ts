import { Injectable } from '@angular/core';
import { authenticatedAjax } from './ajax.util';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersApiService {

  constructor() { }

  getById(id: String): Observable<any> {
    var subject = new Subject<any>()
    authenticatedAjax({
      type: 'GET',
      url: 'http://localhost:3000/api/orders/' + id,
      success: function (data: any) {
        subject.next(data)
      },
      error: function(data: any) {
        subject.next(data)
      }
    });

    return subject.asObservable()
  }

  getAll(): Observable<any> {
    var subject = new Subject<any>()
    authenticatedAjax({
      type: 'GET',
      url: 'http://localhost:3000/api/orders/',
      success: function (data: any) {
        subject.next(data)
      },
      error: function(data: any) {
        subject.next(data)
      }
    });

    return subject.asObservable()
  }
}
