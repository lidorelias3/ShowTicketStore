import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  // Tickets and cart observables
  private eventsSource = new BehaviorSubject<any[]>(
    this.loadTicketsFromLocalStorage()
  );
  currentEvents = this.eventsSource.asObservable();
  private cartSource = new BehaviorSubject<any[]>(
    this.loadCartFromLocalStorage()
  );
  currentCart = this.cartSource.asObservable();

  constructor() {}

  // Load tickets from localStorage (or initial empty list)
  private loadTicketsFromLocalStorage(): any[] {
    const savedTickets = localStorage.getItem('tickets');
    return savedTickets ? JSON.parse(savedTickets) : [];
  }

  // Save tickets to localStorage
  private saveTicketsToLocalStorage(tickets: any[]) {
    localStorage.setItem('tickets', JSON.stringify(tickets));
  }

  // Load cart from localStorage (or initial empty list)
  private loadCartFromLocalStorage(): any[] {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  }

  // Save cart to localStorage
  private saveCartToLocalStorage(cart: any[]) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // Add a new event to the events array
  addEvent(ticket: any) {
    const tickets = this.eventsSource.getValue();
    ticket.id = tickets.length > 0 ? tickets[tickets.length - 1].id + 1 : 1; // Generate unique ID
    tickets.push(ticket);
    this.eventsSource.next(tickets);
    this.saveTicketsToLocalStorage(tickets);
  }

  // Remove a event from the events array
  removeEvent(eventName: any) {
    let events = this.eventsSource.getValue();
    events = events.filter((event) => event.name !== eventName);
    this.eventsSource.next(events);
    this.saveTicketsToLocalStorage(events);
  }

  // Get all available events
  getEvents() {
    return this.eventsSource.getValue();
  }

  // Add ticket to cart
  addToCart(event: any, ticketType: any) {
    const cart = this.cartSource.getValue();
    const existingTicket = cart.find(
      (item) =>
        item.event.name === event.name &&
        item.ticketType.name === ticketType.name
    );

    if (existingTicket) {
      existingTicket.quantity += 1; // Increment quantity if the same ticket exists
    } else {
      cart.push({ event, ticketType, quantity: 1 }); // Add new ticket to cart
    }

    this.cartSource.next(cart);
    this.saveCartToLocalStorage(cart);
  }

  // Remove a specific ticket from the cart by event's name and ticket type
  removeFromCart(eventName: any, ticketType: any) {
    let cart = this.cartSource.getValue();
    // TODO- Not working good
    cart = cart.filter(
      (item) =>
        item.event.name !== eventName || item.ticketType.name !== ticketType
    );
    this.cartSource.next(cart);
    this.saveCartToLocalStorage(cart);
  }

  // Get all tickets in the cart
  getCartItems() {
    return this.cartSource.getValue();
  }

  // Clear the entire cart
  clearCart() {
    this.cartSource.next([]);
    localStorage.removeItem('cart');
  }

  decreaseQuantity(eventName: any, ticketType: any) {
    const cart = this.cartSource.getValue();
    const ticket = cart.find(
      (item) =>
        item.event.name === eventName && item.ticketType.name === ticketType
    );

    if (ticket && ticket.quantity > 1) {
      ticket.quantity -= 1;
    } else {
      this.removeFromCart(eventName, ticketType);
    }

    this.cartSource.next(cart);
    this.saveCartToLocalStorage(cart);
  }

  // Check if the cart is empty
  isCartEmpty(): boolean {
    return this.cartSource.getValue().length === 0;
  }
}
