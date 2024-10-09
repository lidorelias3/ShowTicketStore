import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import Chart from 'chart.js/auto'

@Component({
  selector: 'app-dashboard-orders-by-event',
  templateUrl: './dashboard-orders-by-event.component.html',
  styleUrls: ['./dashboard-orders-by-event.component.scss']
})
export class DashboardOrdersByEventComponent implements OnInit {

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.ordersService.getOrderCountByEvent().subscribe(res => {
      const data = res.message;
      new Chart(
        {
          canvas: document.getElementById('orders-by-event')! as HTMLCanvasElement,
        },
        {
          type: 'bar',
          data: {
            labels: data.map((row: any) => row.eventName),
            datasets: [
              {
                label: 'הזמנות',
                data: data.map((row: any) => row.count)
              }
            ] 
          }
        }
      );
    });
  }
}
