import { Component } from '@angular/core';
import { TicketsService } from '../../services/tickets.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  tickets = [
    { id: 1, name: 'Concert Ticket', price: 100 },
    { id: 2, name: 'Movie Ticket', price: 50 },
    { id: 3, name: 'Sports Ticket', price: 150 }
  ];

  constructor(private ticketsService: TicketsService) { }

  addToCart(ticket: any) {
    this.ticketsService.addToCart(ticket);
    alert(`${ticket.name} added to cart!`);
  }
}
