import { Component } from '@angular/core';
import { TicketsService } from '../../services/tickets.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  events: any[] = [];

  constructor(private ticketsService: TicketsService) {}

  ngOnInit(): void {
    this.ticketsService.currentTickets.subscribe((events) => {
      this.events = events;
    });
  }

  addToCart(event: any, ticketType: any) {
    this.ticketsService.addToCart(event, ticketType);
    alert(`${event.name} - ${ticketType} added to cart!`);
  }
}
