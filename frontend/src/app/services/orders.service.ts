import { Injectable } from '@angular/core';
import { OrdersApiService } from './api/orders-api.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private ordersApiService: OrdersApiService) { }

  getAllOrders() {
    return this.ordersApiService.getAllOrders();
  }

  getOrderCountByEvent() {
    return this.ordersApiService.getOrderCountByEvent();
  }

  getOrderCountByDate() {
    return this.ordersApiService.getOrderCountByDate();
  }
}
