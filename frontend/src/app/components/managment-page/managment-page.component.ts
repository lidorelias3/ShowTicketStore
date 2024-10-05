import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../services/tickets.service';
import { EventsService } from 'src/app/services/events.service';
import { Event } from 'src/app/models/event.model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-managment-page',
  templateUrl: './managment-page.component.html',
  styleUrls: ['./managment-page.component.scss'],
})
export class ManagmentPageComponent implements OnInit {
  newEvent: Event = {
    name: '',
    date: new Date(),
    tickets: [{ ticketType: '', price: 0 }], // Start with one ticket type
    venueName: '',
    minimumAge: 0,
    description: '',
    profileImage: '',
    imagesPaths: [], // List of additional images
  };

  profileImagePreview: string | ArrayBuffer | null = null;
  imagesPreviews: string[] = [];
  eventsList: any[] = []; // To store the list of events
  editFlag = false;
  getEventsSubscription = new Subscription();

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  // Fetch events from the TicketsService
  loadEvents() {
    this.getEventsSubscription = this.eventsService
      .getEvents()
      .subscribe((res) => {
        this.eventsList = res.message;
      });
  }

  // Remove a specific event
  removeEvent(eventName: string) {
    this.eventsService
      .removeEvent(eventName)
      .subscribe((data) => this.loadEvents());
  }

  // Add another ticket type
  addTicketType() {
    this.newEvent.tickets.push({ ticketType: '', price: 0 });
  }

  // Remove a specific ticket type
  removeTicket(ticketType: string) {
    this.newEvent.tickets = this.newEvent.tickets.filter(
      (item) => item.ticketType != ticketType
    );
  }

  // Handle profile image selection and preview
  // TODO - think what to do with the images
  onProfileImageSelected(event: any): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImagePreview = reader.result;
        this.newEvent.profileImage = reader.result as string; // Save the image data as base64 string
      };
      reader.readAsDataURL(file);
    }
  }

  // Handle multiple images selection for `imagesPaths`
  onImagesSelected(event: any): void {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      this.imagesPreviews = [];
      this.newEvent.imagesPaths = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagesPreviews.push(reader.result as string);
          this.newEvent.imagesPaths.push({
            path: reader.result as string,
            description: '',
          }); // Save as base64 string
        };
        reader.readAsDataURL(file);
      });
    }
  }

  // Add new event to the service
  async addEvent() {
    if (this.editFlag) {
      this.editEvent();
      this.editFlag = false;
    } else {
      let res = await this.eventsService.addEvent(this.newEvent);
      if (res !== 'success') {
        alert(res);
        return;
      }
    }
    this.resetForm();
  }

  // Reset form after submission
  resetForm() {
    this.newEvent = {
      name: '',
      date: new Date(),
      tickets: [{ ticketType: '', price: 0 }],
      venueName: '',
      minimumAge: 0,
      description: '',
      profileImage: '',
      imagesPaths: [],
    };
    this.profileImagePreview = null;
    this.imagesPreviews = [];

    this.loadEvents();
  }

  showEditEvent(event: Event) {
    this.newEvent = event;
    this.editFlag = true;
  }

  editEvent() {
    this.eventsService
      .updateExistingEvent(this.newEvent.name, this.newEvent)
      .subscribe()
      .unsubscribe();

    this.getEventsSubscription.unsubscribe();
    this.loadEvents();
  }
}
