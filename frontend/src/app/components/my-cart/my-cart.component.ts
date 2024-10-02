import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../services/tickets.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss'],
})
export class MyCartComponent implements OnInit {
  cartItems: any[] = [];
  totalCost: number = 0;

  constructor(private ticketsService: TicketsService, private router: Router) {}

  ngOnInit(): void {
    this.cartItems = this.ticketsService.getCartItems();
    this.calculateTotalCost();
  }

  addToCart(event: any, ticketType: any) {
    this.ticketsService.addToCart(event, ticketType);
    this.calculateTotalCost();
  }

  removeItem(eventName: any, ticketType: any) {
    this.ticketsService.removeFromCart(eventName, ticketType);
    this.cartItems = this.ticketsService.getCartItems();
  }

  decreaseItem(eventName: any, ticketType: any) {
    this.ticketsService.decreaseQuantity(eventName, ticketType);
    this.calculateTotalCost();
  }

  calculateTotalCost() {
    this.totalCost = this.cartItems.reduce(
      (sum, item) => sum + item.ticketType.price * item.quantity,
      0
    );
  }

  clearCart() {
    this.ticketsService.clearCart();
  }

  isCartEmpty() {
    return this.ticketsService.isCartEmpty();
  }

  // Navigate to the pay page
  pay() {
    this.router.navigate(['/pay']);
  }
}
