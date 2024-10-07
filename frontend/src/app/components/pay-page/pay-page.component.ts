import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-pay-page',
  templateUrl: './pay-page.component.html',
  styleUrls: ['./pay-page.component.scss']
})
export class PayPageComponent {
  loading: boolean = false;

  constructor(private router: Router, private ticketService: TicketsService) {}

  processPayment() {
    // Simulate payment processing
    this.loading = true;
    this.ticketService.purchase().subscribe(res => {
      if (res === false) {
        this.loading = false
        return
      } 

      this.loading = false
      if(res) {
        alert("הרכישה הסתיימה בהצלחה, נתראה ברכישה הבאה")
        this.router.navigate(['']);
      }
    })
  }
}
