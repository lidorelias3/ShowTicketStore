import { Injectable } from '@angular/core';
import { VenueApiService } from './api/venue-api.service';
import { Venue } from '../models/venue.model';

@Injectable({
  providedIn: 'root',
})
export class VenuesService {
  constructor(private venuesApiService: VenueApiService) {}

  getVenueByID(id: string) {
    return this.venuesApiService.getById(id);
  }

  getVenueByName(name: string) {
    return this.venuesApiService.getByName(name);
  }

  getAllVenues() {
    return this.venuesApiService.getAllEvents();
  }

  newVenue(venue: Venue) {
    return this.venuesApiService.createVenue(venue);
  }

  upateVenue(venue: Venue) {
    return this.venuesApiService.updateVenue(venue._id!, venue);
  }

  removeVenue(id: string) {
    return this.venuesApiService.deleteById(id);
  }
}
