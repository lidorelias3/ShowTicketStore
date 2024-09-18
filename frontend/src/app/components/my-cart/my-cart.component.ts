import { Component } from '@angular/core';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss']
})
export class MyCartComponent {
  tickets = [
    { id: 1, name: 'Concert Ticket', description: 'VIP concert ticket', price: 100 },
    { id: 2, name: 'Sports Ticket', description: 'Front row sports ticket', price: 150 },
    { id: 3, name: 'Movie Ticket', description: 'Premiere movie ticket', price: 50 }
  ];

  // Cart to store selected tickets
  cart: any[] = [{ id: 1, name: 'Concert Ticket', description: 'VIP concert ticket', price: 100 }, { id: 3, name: 'Movie Ticket', description: 'Premiere movie ticket', price: 50 }];
  totalCost: number = this.cart.reduce((total, item) => total + item.price, 0);

  // Method to add a ticket to the cart
  // addToCart(ticket: any) {
  //   this.cart.push(ticket);
  //   this.calculateTotal();
  // }

  // Method to remove a ticket from the cart
  removeFromCart(ticketId: number) {
    this.cart = this.cart.filter(item => item.id !== ticketId);
    this.calculateTotal();
  }

  // Method to calculate the total cost of the cart
  calculateTotal() {
    this.totalCost = this.cart.reduce((total, item) => total + item.price, 0);
  }

  // Method to clear the cart
  clearCart() {
    this.cart = [];
    this.totalCost = 0;
  }

}
