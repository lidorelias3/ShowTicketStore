import { Injectable } from '@angular/core';
import { VenueApiService } from './api/venue-api.service';

@Injectable({
  providedIn: 'root'
})
export class VenuesService {

  constructor(private venuesApiService: VenueApiService) { }

  getVenueByID(id: string) {
    return this.venuesApiService.getById(id)
  }

  getVenueByName(name: string) {
    return this.venuesApiService.getByName(name)
  }

  getAllVenues() {
    return this.venuesApiService.getAllEvents()
  }
}
