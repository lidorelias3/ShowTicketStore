import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { EventAPIService } from './api/events-api.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  // Cart observables
  private cartSource = new BehaviorSubject<any[]>(
    this.loadCartFromLocalStorage()
  );
  currentCart = this.cartSource.asObservable();

  constructor(private eventsApiService: EventAPIService, private userService: UserService) {}

  // Load cart from localStorage (or initial empty list)
  private loadCartFromLocalStorage(): any[] {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  }

  // Save cart to localStorage
  private saveCartToLocalStorage(cart: any[]) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // Add ticket to cart
  addToCart(event: any, ticketType: any, amount: number = 1) {
    const cart = this.cartSource.getValue();
    const existingTicket = cart.find(
      (item) =>
        item.event.name === event.name &&
        item.ticketType.name === ticketType.name
    );

    if (existingTicket) {
      existingTicket.quantity += amount; // Increment quantity if the same ticket exists
    } else {
      cart.push({ event, ticketType, quantity: amount }); // Add new ticket to cart
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

  purchase(): Observable<any>{
    var success = new Subject()
    var userID = this.userService.getCureentUserID()

    if (userID == undefined) {
      alert("על מנת להמשיך ברכישה עליך להתחבר לאתר")
      return new BehaviorSubject(false).asObservable()  
    }

    var elements = this.getCartItems().map(it=> {return {eventId: it.event._id, ticketType: it.ticketType.ticketType, quantity: it.quantity}})

    this.eventsApiService.purchase(elements).subscribe(res => {
      if (!res.success) {
        alert(`הבקשה נכשלה, אנא וודא את כל הפרמטרים. \n${res.responseJSON.message}`)
        success.next(false)
      } else {
        this.clearCart()
        success.next(true)
      }
    })  

    return success
  }
}
