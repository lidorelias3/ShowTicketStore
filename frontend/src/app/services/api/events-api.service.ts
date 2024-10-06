import { Injectable } from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { Observable, Subject } from 'rxjs';
import { authenticatedAjax } from './ajax.util';

@Injectable({
  providedIn: 'root',
})
export class EventAPIService {

  getAllEvents(): Observable<any> {
    var subject = new Subject<any>()
    authenticatedAjax({
      type: 'GET',
      url: 'http://localhost:3000/api/event/',
      success: function (data: any) {
        subject.next(data)
      },
      error: function(data: any) {
        subject.next(data)
      }
    });

    return subject.asObservable()
  }

  getById(id: String): Observable<any> {
    var subject = new Subject<any>()
    authenticatedAjax({
      type: 'GET',
      url: 'http://localhost:3000/api/event/' + id,
      success: function (data: any) {
        subject.next(data)
      },
      error: function(data: any) {
        subject.next(data)
      }
    });

    return subject.asObservable()
  }

  createEvent(event: Event): Observable<any> {
    var subject = new Subject<any>()
    authenticatedAjax({
      type: 'POST',
      url: 'http://localhost:3000/api/event',
      data: event,
      contentType: "application/json",
      success: function (data: any) {
        subject.next(data)
      },
      error: function(data: any) {
        subject.next(data)
      }
    });

    return subject.asObservable()
  }

  deleteEvent(name: string) {
    var subject = new Subject<any>()
   authenticatedAjax({
      url: `http://localhost:3000/api/event/${name}`  ,
      type: 'DELETE',
      async: true,
      success: function (result: any) {
        subject.next(result)
      }
    });
    return subject.asObservable()
  }

  updateExistingEvent(existEventName: string, event: Event): Observable<any> {
    var subject = new Subject<any>()
    authenticatedAjax({
      type: "PUT",
      url: `http://localhost:3000/api/event/${encodeURI(existEventName)}`,
      contentType: "application/json",
      data: JSON.stringify(event),
      async: true,
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
