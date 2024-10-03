import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private cartKey = 'cart';  // Key for localStorage
  private cartSource = new BehaviorSubject<any[]>(this.loadCartFromLocalStorage());
  currentCart = this.cartSource.asObservable();

  constructor() { }

  // Load cart from localStorage
  private loadCartFromLocalStorage(): any[] {
    const savedCart = localStorage.getItem(this.cartKey);
    return savedCart ? JSON.parse(savedCart) : [];
  }

  // Save cart to localStorage
  private saveCartToLocalStorage(cart: any[]) {
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  addToCart(ticket: any) {
    const cart = this.cartSource.getValue();
    const existingTicket = cart.find(item => item.id === ticket.id);

    if (existingTicket) {
      existingTicket.quantity += 1;
    } else {
      cart.push({ ...ticket, quantity: 1 });
    }

    this.cartSource.next(cart);
    this.saveCartToLocalStorage(cart);
  }

  removeFromCart(ticketId: number) {
    let cart = this.cartSource.getValue();
    cart = cart.filter(item => item.id !== ticketId);

    this.cartSource.next(cart);
    this.saveCartToLocalStorage(cart);
  }

  decreaseQuantity(ticketId: number) {
    const cart = this.cartSource.getValue();
    const ticket = cart.find(item => item.id === ticketId);

    if (ticket && ticket.quantity > 1) {
      ticket.quantity -= 1;
    } else {
      this.removeFromCart(ticketId);
    }

    this.cartSource.next(cart);
    this.saveCartToLocalStorage(cart);
  }

  clearCart() {
    this.cartSource.next([]);
    localStorage.removeItem(this.cartKey); // Clear localStorage
  }
}
