import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../services/tickets.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  events: any[] = [];

  constructor(
    private ticketsService: TicketsService,
    private eventsService: EventsService
  ) {}

  ngOnInit(): void {
    this.eventsService.getEvents().subscribe((events) => {
      this.events = events;
    });
    console.log(this.events);
  }

  addToCart(event: any, ticketType: any) {
    this.ticketsService.addToCart(event, ticketType);
    alert(`${event.name} - ${ticketType} added to cart!`);
  }
}
