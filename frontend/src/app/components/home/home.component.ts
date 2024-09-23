import { Component } from '@angular/core';
import { TicketsService } from '../../services/tickets.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  tickets: any[] = [];

  constructor(private ticketsService: TicketsService) {}

  ngOnInit(): void {
    this.ticketsService.currentTickets.subscribe((tickets) => {
      this.tickets = tickets;
    });
  }

  addToCart(ticket: any) {
    this.ticketsService.addToCart(ticket);
    alert(`${ticket.name} added to cart!`);
  }
}
