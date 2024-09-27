import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pay-page',
  templateUrl: './pay-page.component.html',
  styleUrls: ['./pay-page.component.scss']
})
export class PayPageComponent {
  loading: boolean = false;
  paymentSuccess: boolean = false;

  constructor(private router: Router) {}

  processPayment() {
    // Simulate payment processing
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      this.paymentSuccess = true;
    }, 3000); // Simulate 3 seconds payment process delay
  }

  goBack() {
    // Navigate back to the cart
    this.router.navigate(['/my-cart']);
  }
}
