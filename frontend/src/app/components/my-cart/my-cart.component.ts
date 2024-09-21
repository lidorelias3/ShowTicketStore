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
      this.totalCost = this.cartItems.reduce((sum, item) => sum + item.price, 0);
    });
  }

  removeItem(itemId: number) {
    this.ticketsService.removeFromCart(itemId);
  }

  clearCart() {
    this.ticketsService.clearCart();
  }
}
