import { Injectable } from '@angular/core';
import { EventAPIService } from './api/events-api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Event } from '../models/event.model';


@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private eventApiService: EventAPIService) {}

  // Add a new event to the events array
  addEvent(event: Event): Observable<any> {
    return this.eventApiService
      .createEvent(event)
  }

  // Remove a event from the events array
  removeEvent(eventName: string) {
    return this.eventApiService.deleteEvent(eventName);
  }

  getEvents(minAge?: number, maxPrice?: number, venueName?: string) {
    return this.eventApiService.getAllEvents(minAge, maxPrice, venueName);
  }


  updateExistingEvent(existEventName: string, event: Event) {
    return this.eventApiService.updateExistingEvent(existEventName, event);
  }

  getEventByID(id: string): Observable<any> {
    return this.eventApiService.getById(id)
  }
}
