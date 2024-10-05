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
  addEvent(event: Event): Promise<string> {
    return this.eventApiService
      .createEvent(event)
      .toPromise()
      .then((resJson) => {
        if (!resJson.success) {
          return resJson.error.message; // Return error message as a string
        }
        return 'success'; // Return success as a string
      })
      .catch((error) => {
        return 'Error: ' + error.error.message; // Handle any errors and return as a string
      });
  }

  // Remove a event from the events array
  removeEvent(eventName: string) {
    return this.eventApiService.deleteEvent(eventName);
  }

  // Get all available events
  getEvents() {
    return this.eventApiService.getAllEvents();
  }

  updateExistingEvent(existEventName: string, event: Event) {
    return this.eventApiService.updateExistingEvent(existEventName, event);
  }

  getEventByID(id: string): Observable<any> {
    return this.eventApiService.getById(id)
  }
}
