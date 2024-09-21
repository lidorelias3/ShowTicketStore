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
    const currentCart = this.cart.value;
    const ticketInCart = currentCart.find(item => item.id === ticket.id);

    if (ticketInCart) {
      // Ticket already in cart, increase the quantity
      ticketInCart.quantity += 1;
    } else {
      // Ticket not in cart, add with quantity 1
      currentCart.push({ ...ticket, quantity: 1 });
    }

    this.cart.next(currentCart);
  }

  removeFromCart(ticketId: number) {
    const currentCart = this.cart.value.filter(item => item.id !== ticketId);
    this.cart.next(currentCart);
  }

  decreaseQuantity(ticketId: number) {
    const currentCart = this.cart.value.map(item => {
      if (item.id === ticketId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    this.cart.next(currentCart);
  }

  clearCart() {
    this.cart.next([]);
  }
}
