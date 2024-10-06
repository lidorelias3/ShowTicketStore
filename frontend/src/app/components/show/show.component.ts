import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/models/event.model';
import { EventsService } from 'src/app/services/events.service';
import { TicketsService } from 'src/app/services/tickets.service';
import { VenuesService } from 'src/app/services/venues.service';
import { Loader } from '@googlemaps/js-api-loader';

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
  center: google.maps.LatLngLiteral; // For map center
  map: google.maps.Map; // Google Map instance

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private ticketsService: TicketsService,
    private venuesService: VenuesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'] || 0;
    });

    this.eventsService.getEventByID(this.id).subscribe((res) => {
      this.show = res.message;
      this.venuesService
        .getVenueByName(this.show.venueName)
        .subscribe((res) => {
          this.initializeMap(res.message); // Initialize map once the show data is loaded
        });
    });
  }

  initializeMap(venue: any) {
    const loader = new Loader({
      apiKey: 'AIzaSyDYJ2elwHMpMisrji9VBvbYHsMOs3Lsprg',
      version: 'weekly',
    });

    loader.load().then(() => {
      const fullAddress = `${venue.location.address}, ${venue.location.city}, ${venue.location.state}, ${venue.location.country}`;
      console.log(`fullAddress ${fullAddress}`);

      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: fullAddress }, (results, status) => {
        if (status === 'OK' && results && results.length > 0) {
          // Check if results is not null and has elements
          this.center = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          };

          this.map = new google.maps.Map(
            document.getElementById('map') as HTMLElement,
            {
              center: this.center,
              zoom: 15,
            }
          );

          new google.maps.Marker({
            position: this.center,
            map: this.map,
            title: this.show.venueName,
          });
        } else {
          console.error('Geocoding was not successful: ' + status);
        }
      });
    });
  }

  addToCart() {
    if (this.selectedType === '') {
      alert('Please select a ticket type');
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
    this.amount += 1 * by;
  }
}
