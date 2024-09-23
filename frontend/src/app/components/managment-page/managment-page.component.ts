import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../tickets.service';

@Component({
  selector: 'app-managment-page',
  templateUrl: './managment-page.component.html',
  styleUrls: ['./managment-page.component.scss']
})
export class ManagmentPageComponent implements OnInit {
  newTicket = {
    name: '',
    price: 0
  };
  tickets: any[] = [];

  constructor(private ticketsService: TicketsService) {}

  ngOnInit(): void {
    this.ticketsService.currentTickets.subscribe(tickets => {
      this.tickets = tickets;
    });
  }

  // Load the current list of tickets
  loadTickets() {
    this.tickets = this.ticketsService.getTickets();
  }

  // Add a new ticket
  addTicket() {
    this.ticketsService.addTicket(this.newTicket);
    this.newTicket = { name: '', price: 0 };  // Reset form
    this.loadTickets();  // Reload the ticket list
  }

  // Remove a ticket by ID
  removeTicket(ticketId: number) {
    this.ticketsService.removeTicket(ticketId);
    this.loadTickets();  // Reload the ticket list
  }
}
