import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/models/event.model';
import { EventsService } from 'src/app/services/events.service';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
})
export class ShowComponent implements OnInit {
  id: string;
  show: Event;

  selectedType: string = '';
  amount = 1;

  // Map-related variables
  center: google.maps.LatLngLiteral; // Google Maps center
  zoom = 15; // Zoom level for the map

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private ticketsService: TicketsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get the event by ID
    this.route.params
      .subscribe((params) => {
        this.id = params['id'] || 0;
      })
      .unsubscribe();

    this.eventsService.getEventByID(this.id).subscribe((res) => {
      this.show = res.message;

      // Set the map center (either static coordinates or fetched dynamically)
      this.setMapCenter();
    });
  }

  // Set static coordinates for now (replace with actual coordinates)
  setMapCenter() {
    this.center = {
      lat: 40.73061, // Example latitude (replace with actual)
      lng: -73.935242, // Example longitude (replace with actual)
    };
  }

  addToCart() {
    if (this.selectedType === '') {
      alert('אנא בחר סוג כרטיס');
      return;
    }

    this.ticketsService.addToCart(
      this.show,
      this.show.tickets.filter((it) => it.ticketType == this.selectedType)[0],
      this.amount
    );

    this.router.navigate(['']);
  }

  increaseAmount(by: number) {
    this.amount += by;
  }
}
