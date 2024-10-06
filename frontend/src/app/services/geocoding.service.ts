import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
  private geocodingApiUrl = 'https://maps.googleapis.com/maps/api/geocode/json';

  constructor(private http: HttpClient) {}

  getCoordinates(address: string, apiKey: string): Observable<any> {
    const url = `${this.geocodingApiUrl}?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`;
    console.log(`url ${url}`);

    return this.http.get(url);
  }
}
