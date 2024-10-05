import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venue } from 'src/app/models/venue.model';

@Injectable({
  providedIn: 'root'
})
export class VenueApiService {

  constructor(private httpClient: HttpClient) { }

  getAllEvents(): Observable<any> {
    return this.httpClient.get<any>('http://127.0.0.1:3000/api/venue');
  }

  getById(id: string): Observable<any> {
    return this.httpClient.get<any>('http://127.0.0.1:3000/api/venue/' + id);
  }

  getByName(name: string): Observable<any> {
    return this.httpClient.get<any>('http://127.0.0.1:3000/api/venue/?name=' + encodeURI(name));
  }

  createVenue(event: Venue): Observable<any> {
    var body = JSON.stringify(event);

    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.httpClient.post<any>(
      'http://127.0.0.1:3000/api/venue',
      body,
      httpOptions
    );
  }

}
