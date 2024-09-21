import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private cart = new BehaviorSubject<any[]>([]);
  currentCart = this.cart.asObservable();

  constructor() { }

  addToCart(ticket: any) {
    const currentValue = this.cart.value;
    const updatedCart = [...currentValue, ticket];
    this.cart.next(updatedCart);
  }

  removeFromCart(ticketId: number) {
    const updatedCart = this.cart.value.filter(item => item.id !== ticketId);
    this.cart.next(updatedCart);
  }

  clearCart() {
    this.cart.next([]);
  }
}
