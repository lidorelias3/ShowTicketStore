import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../services/tickets.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss']
})
export class MyCartComponent implements OnInit {
  cartItems: any[] = [];
  totalCost: number = 0;

  constructor(private ticketsService: TicketsService, private router: Router) { }

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

  // Navigate to the pay page
  pay() {
    this.router.navigate(['/pay']);
  }
}
