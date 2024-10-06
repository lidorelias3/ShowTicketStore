import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Venue } from 'src/app/models/venue.model';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class VenueApiService {
  getAllEvents(): Observable<any> {
    var subject = new Subject<any>()
    $.get('http://localhost:3000/api/venue',
      function (data, _) {
        subject.next(data)
      }
    );

    return subject.asObservable()
  }

  getById(id: string): Observable<any> {
    var subject = new Subject<any>()
    $.get(`http://localhost:3000/api/venue${id}`,
      function (data, _) {
        subject.next(data)
      }
    );

    return subject.asObservable()
  }

  getByName(name: string): Observable<any> {
    var subject = new Subject<any>()
    $.get(`http://localhost:3000/api/venue/?name=${encodeURI(name)}`,
      function (data, _) {
        subject.next(data)
      }
    );

    return subject.asObservable()
  }

  createVenue(venue: Venue): Observable<any> {
    var subject = new Subject<any>()
    $.ajax({
      type: "POST",
      url: `http://localhost:3000/api/venue`,
      contentType: "application/json",
      data: JSON.stringify(venue),
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

  
  deleteById(id: string) {
    var subject = new Subject<any>()
    $.ajax({
      url: `http://localhost:3000/api/venue/${id}`,
      type: 'DELETE',
      async: true,
      success: function (result) {
        subject.next(result)
      }
    });
    return subject.asObservable()
  }

  updateVenue(id: string, venue: Venue) {
    var subject = new Subject<any>()
    $.ajax({
      type: "PUT",
      url: `http://localhost:3000/api/venue/${id}`,
      contentType: "application/json",
      data: JSON.stringify(venue),
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
