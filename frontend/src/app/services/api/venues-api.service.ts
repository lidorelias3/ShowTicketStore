import { Injectable } from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VenueAPIService {
  constructor(private httpClient: HttpClient) {}

  getVenueByName(name: string): Observable<any> {
    return this.httpClient.get<any>(`http://127.0.0.1:3000/api/venue/${name}`);
  }
}
