import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import Chart from 'chart.js/auto'

@Component({
  selector: 'app-dashboard-orders-by-date',
  templateUrl: './dashboard-orders-by-date.component.html',
  styleUrls: ['./dashboard-orders-by-date.component.scss']
})
export class DashboardOrdersByDateComponent implements OnInit {

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.ordersService.getOrderCountByDate().subscribe(res => {
      var data = res.message;
      data = data.sort((a:any, b:any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      new Chart(
        {
          canvas: document.getElementById('orders-by-date')! as HTMLCanvasElement,
        },
        {
          type: 'bar',
          data: {
            labels: data.map((row: any) => row.createdAt),
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
