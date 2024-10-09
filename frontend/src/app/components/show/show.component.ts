import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/models/event.model';
import { EventsService } from 'src/app/services/events.service';
import { TicketsService } from 'src/app/services/tickets.service';
import { VenuesService } from 'src/app/services/venues.service';
import { Loader } from '@googlemaps/js-api-loader';
import { environment } from 'src/app/environments/environment';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
})
export class ShowComponent implements OnInit {
  id: string;
  show: Event;

  selectedType: string = '';
  amount = 0;
  center: google.maps.LatLngLiteral; // For map center
  map: google.maps.Map; // Google Map instance

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private ticketsService: TicketsService,
    private venuesService: VenuesService,
    private router: Router,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'] || 0;
    });
    this.loadGoogleMapsScript();

    this.eventsService.getEventByID(this.id).subscribe((res) => {
      this.show = res.message;
      this.venuesService
        .getVenueByName(this.show.venueName)
        .subscribe((res) => {
          this.initializeMap(res.message[0]); // Initialize map once the show data is loaded
        });
    });
  }

  loadGoogleMapsScript() {
    const script = this.renderer.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}`;
    script.async = true;
    script.defer = true;
    this.renderer.appendChild(document.head, script);
  }

  initializeMap(venue: any) {
    const loader = new Loader({
      apiKey: environment.googleMapsApiKey,
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
    if (this.selectedType == '') {
      alert("עליך לבחור סוג כרטיס לפני שתבחר כמות")
    }

    if (by == -1 && this.amount == 0) {
      return
    } 

    if (by == 1 && this.show.tickets.filter((it) => it.ticketType == this.selectedType)[0].remaining == this.amount) {
      alert("בחרת את כמות הכרטיסים המקסימלית לפריט זה")
      return
    }

    this.amount += 1 * by;
  }
}
