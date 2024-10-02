import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  private apiUrl = 'http://localhost:3000/api/'; // Your backend API URL

  // Tickets and cart observables
  private ticketsSource = new BehaviorSubject<any[]>(
    this.loadTicketsFromLocalStorage()
  );
  currentTickets = this.ticketsSource.asObservable();
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

  // Add a new ticket to the tickets array
  addTicket(ticket: any) {
    const tickets = this.ticketsSource.getValue();
    ticket.id = tickets.length > 0 ? tickets[tickets.length - 1].id + 1 : 1; // Generate unique ID
    tickets.push(ticket);
    this.ticketsSource.next(tickets);
    this.saveTicketsToLocalStorage(tickets);
  }

  // Remove a ticket from the tickets array
  removeTicket(ticketId: number) {
    let tickets = this.ticketsSource.getValue();
    tickets = tickets.filter((ticket) => ticket.id !== ticketId);
    this.ticketsSource.next(tickets);
    this.saveTicketsToLocalStorage(tickets);
  }

  // Get all available tickets
  getTickets() {
    return this.ticketsSource.getValue();
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

  // Remove a specific ticket from the cart by its ID
  removeFromCart(eventName: any, ticketType: any) {
    let cart = this.cartSource.getValue();
    cart = cart.filter(
      (item) =>
        item.event.name !== eventName && item.ticketType.name != ticketType
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
    let flag = this.cartSource.getValue().length === 0;
    return flag;
  }
}
