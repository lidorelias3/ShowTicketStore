import { Injectable } from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventAPIService {
  constructor(private httpClient: HttpClient) {}

  getAllEvents(): Observable<any> {
    return this.httpClient.get<any>('http://127.0.0.1:3000/api/event');
  }

  getById(id: String): Observable<any> {
    return this.httpClient.get<any>('http://127.0.0.1:3000/api/event/' + id);
  }

  createEvent(event: Event): Observable<any> {
    var body = JSON.stringify({
      name: event.name,
      date: event.date,
      venueName: event.venueName,
      tickets: event.tickets,
      minimumAge: event.minimumAge,
      description: event.description,
      profileImage: event.profileImage,
      imagesPaths: event.imagesPaths,
    });

    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.httpClient.post<any>(
      'http://127.0.0.1:3000/api/event',
      body,
      httpOptions
    );
  }

  deleteEvent(name: string) {
    return this.httpClient.delete<any>(
      `http://127.0.0.1:3000/api/event/${name}`
    );
  }

  deleteById(id: string) {
    return this.httpClient.delete<any>(
      `http://127.0.0.1:3000/api/event/id/${id}`
    );
  }

  updateExistingEvent(existEventName: string, event: Event) {
    var body = JSON.stringify({
      name: event.name,
      date: event.date,
      venueName: event.venueName,
      tickets: event.tickets,
      minimumAge: event.minimumAge,
      description: event.description,
      profileImage: event.profileImage,
      imagesPaths: event.imagesPaths,
    });

    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.httpClient.put<any>(
      `http://127.0.0.1:3000/api/event/${encodeURI(existEventName)}`,
      body,
      httpOptions
    );
  }
}
