import { Component } from '@angular/core';
import { TicketsService } from '../../tickets.service';

@Component({
  selector: 'app-managment-page',
  templateUrl: './managment-page.component.html',
  styleUrls: ['./managment-page.component.scss']
})
export class ManagmentPageComponent {
  newEvent = {
    name: '',
    date: '',
    tickets: [{ name: '', price: 0, quantity: 0 }], // Start with one ticket type
    venueName: '',
    minimumAge: 0,
    description: '',
    profileImage: '',
    imagesPaths: [] // List of additional images
  };

  profileImagePreview: string | ArrayBuffer | null = null;
  imagesPreviews: string[] = [];

  constructor(private ticketsService: TicketsService) {}

  // Add another ticket type
  addTicketType() {
    this.newEvent.tickets.push({ name: '', price: 0, quantity: 0 });
  }

  // Remove a specific ticket type
  removeTicket(index: number) {
    this.newEvent.tickets.splice(index, 1);
  }

  // Handle profile image selection and preview
  onProfileImageSelected(event: Event): void {
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
  onImagesSelected(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      this.imagesPreviews = [];
      this.newEvent.imagesPaths = [];
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagesPreviews.push(reader.result as string);
          // this.newEvent.imagesPaths.push(reader.result as string); // Save as base64 string
        };
        reader.readAsDataURL(file);
      });
    }
  }

  // Add new event to the service
  addTicket() {
    this.ticketsService.addTicket(this.newEvent);
    this.resetForm();
  }

  // Reset form after submission
  resetForm() {
    this.newEvent = {
      name: '',
      date: '',
      tickets: [{ name: '', price: 0, quantity: 0 }],
      venueName: '',
      minimumAge: 0,
      description: '',
      profileImage: '',
      imagesPaths: []
    };
    this.profileImagePreview = null;
    this.imagesPreviews = [];
  }
}
