import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../tickets.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss']
})
export class MyCartComponent implements OnInit {
  cartItems: any[] = [];
  totalCost: number = 0;

  constructor(private ticketsService: TicketsService) { }

  ngOnInit(): void {
    this.ticketsService.currentCart.subscribe(cart => {
      this.cartItems = cart;
      this.calculateTotalCost();
    });
  }

  addToCart(ticket: any) {
    this.ticketsService.addToCart(ticket);
  }

  removeItem(itemId: number) {
    this.ticketsService.removeFromCart(itemId);
  }

  decreaseItem(itemId: number) {
    this.ticketsService.decreaseQuantity(itemId);
  }

  calculateTotalCost() {
    this.totalCost = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  clearCart() {
    this.ticketsService.clearCart();
  }

  // Pay method - shows a confirmation for now, can be expanded for real payments
  pay() {
    // Logic to handle payment (can be expanded to integrate with payment gateways)
    alert(`You have paid $${this.totalCost}. Thank you for your purchase!`);
    
    // Clear cart after payment
    this.clearCart();
  }
}
