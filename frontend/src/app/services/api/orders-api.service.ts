import { Injectable } from '@angular/core';
import { authenticatedAjax } from './ajax.util';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersApiService {

  constructor() { }

  getById(id: String, price ? : number): Observable<any> {

    let url = "";
    if (price) {
      url = `http://localhost:3000/api/orders/${id}?totalPrice=${price}`
    } else {
      url = `http://localhost:3000/api/orders/${id}`
    }

    console.log('Price:', price, 'Url:', url);

    var subject = new Subject<any>()
    authenticatedAjax({
      type: 'GET',
      url: url,
      success: function (data: any) {
        subject.next(data)
      },
      error: function(data: any) {
        subject.next(data)
      }
    });

    return subject.asObservable()
  }

  getAll(price?: number): Observable<any> {
    let url = "";
    if (price) {
      url = `http://localhost:3000/api/orders/?totalPrice=${price}`
    } else {
      url = 'http://localhost:3000/api/orders/'
    }


    var subject = new Subject<any>()
    authenticatedAjax({
      type: 'GET',
      url: url,
      success: function (data: any) {
        subject.next(data)
      },
      error: function(data: any) {
        subject.next(data)
      }
    });

    return subject.asObservable()
  }

  delete(id: string) {
    var subject = new Subject<any>()
    authenticatedAjax({
      type: 'DELETE',
      url: `http://localhost:3000/api/orders/${id}`,
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
