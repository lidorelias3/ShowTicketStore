import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Venue } from 'src/app/models/venue.model';
import { authenticatedAjax } from './ajax.util';

@Injectable({
  providedIn: 'root'
})
export class VenueApiService {
  getAllEvents(city?: string, minCapacity?: number, zoneName?: string): Observable<any> {
    var params: string[] = []

    if (minCapacity !== undefined && minCapacity > 0) {
      params.push(`minCapacity=${encodeURIComponent(minCapacity)}`);
    }

    if (city !== undefined && city.length >= 3) {
      params.push(`city=${encodeURIComponent(city)}`);
    }

    if (zoneName !== undefined && zoneName.length >= 3) {
      params.push(`zoneName=${encodeURIComponent(zoneName)}`);
    }

    var url = 'http://localhost:3000/api/venue?' + params.join('&')

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

  getById(id: string): Observable<any> {
    var subject = new Subject<any>()
    authenticatedAjax({
      type: 'GET',
      url: `http://localhost:3000/api/venue/id/${id}`,
      success: function (data: any) {
        subject.next(data)
      },
      error: function(data: any) {
        subject.next(data)
      }
    });

    return subject.asObservable()
  }

  getByName(name: string): Observable<any> {
    var subject = new Subject<any>()
    authenticatedAjax({
      type: 'GET',
      url: `http://localhost:3000/api/venue/name/${encodeURI(name)}`,
      success: function (data: any) {
        subject.next(data)
      },
      error: function(data: any) {
        subject.next(data)
      }
    });

    return subject.asObservable()
  }

  createVenue(venue: Venue): Observable<any> {
    var subject = new Subject<any>()
    authenticatedAjax({
      type: "POST",
      url: `http://localhost:3000/api/venue`,
      contentType: "application/json",
      data: JSON.stringify(venue),
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

  
  deleteById(id: string) {
    var subject = new Subject<any>()
    authenticatedAjax({
      url: `http://localhost:3000/api/venue/${id}`,
      type: 'DELETE',
      async: true,
      success: function (result: any) {
        subject.next(result)
      }
    });
    return subject.asObservable()
  }

  updateVenue(id: string, venue: Venue) {
    var subject = new Subject<any>()
    authenticatedAjax({
      type: "PUT",
      url: `http://localhost:3000/api/venue/${id}`,
      contentType: "application/json",
      data: JSON.stringify(venue),
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
