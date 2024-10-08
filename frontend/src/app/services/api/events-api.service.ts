import { Injectable } from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { min, Observable, Subject } from 'rxjs';
import { authenticatedAjax } from './ajax.util';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root',
})
export class EventAPIService {

  getAllEvents(minAge?: number, maxPrice?:number, venueName?: string): Observable<any> {
    var params: string[] = []

    if (minAge !== undefined && minAge > 0) {
      params.push(`minAge=${encodeURIComponent(minAge)}`);
    }

    if (maxPrice !== undefined && maxPrice > 0) {
      params.push(`maxPrice=${encodeURIComponent(maxPrice)}`);
    }

    if (venueName !== undefined && venueName.length >= 3) {
      params.push(`venue=${encodeURIComponent(venueName)}`);
    }

    var url = 'http://localhost:3000/api/event?' + params.join("&")

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
      data: JSON.stringify(event),
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
      url: `http://localhost:3000/api/event/${name}`,
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

  purchase(tickets: Array<{eventId: string, ticketType: string, quantity: number}>): Observable<any> {
    var body = JSON.stringify({
      tickets: tickets
    })
    
    var subject = new Subject<any>()
    authenticatedAjax({
      type: "POST",
      url: `http://localhost:3000/api/event/purchase`,
      contentType: "application/json",
      data: body,
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
