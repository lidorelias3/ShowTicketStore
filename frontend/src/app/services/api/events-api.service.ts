import { Injectable } from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { Observable, Subject } from 'rxjs';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root',
})
export class EventAPIService {

  getAllEvents(): Observable<any> {
    var subject = new Subject<any>()
    $.get('http://localhost:3000/api/event/',
      function (data, _) {
        subject.next(data)
      }
    );

    return subject.asObservable()
  }

  getById(id: String): Observable<any> {
    var subject = new Subject<any>()
    $.get('http://localhost:3000/api/event/' + id,
      function (data, _) {
        subject.next(data)
      }
    );

    return subject.asObservable()
  }

  createEvent(event: Event): Observable<any> {
    var subject = new Subject<any>()
    $.post('http://localhost:3000/api/event', event,
      function (data, _) {
        subject.next(data)
      }
    );

    return subject.asObservable()
  }

  deleteEvent(name: string) {
    var subject = new Subject<any>()
    $.ajax({
      url: `http://localhost:3000/api/event/${name}`  ,
      type: 'DELETE',
      async: true,
      success: function (result) {
        subject.next(result)
      }
    });
    return subject.asObservable()
  }

  updateExistingEvent(existEventName: string, event: Event): Observable<any> {
    var subject = new Subject<any>()
    $.ajax({
      type: "PUT",
      url: `http://localhost:3000/api/event/${encodeURI(existEventName)}`,
      contentType: "application/json",
      data: JSON.stringify(event),
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
