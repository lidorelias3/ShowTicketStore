import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { OrdersApiService } from 'src/app/services/api/orders-api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.scss']
})
export class PurchaseHistoryComponent implements OnInit {
  @Input() watchAll: boolean = false

  orders: Order[] = []
  constructor(private userService: UserService, private ordersApiService: OrdersApiService) { }

  ngOnInit(): void {
    this.loadOrders()
  }

  loadOrders() {
    if (this.watchAll) {
      this.ordersApiService.getAll().subscribe(res => {
        if (!res.success) {
          alert(res.responseJSON.message)
          alert(res.responseJSON.detailes)
          return
        }

        this.orders = res.message
      })

      return
    }

    var id = this.userService.getCurrentUserID()

    if (id === undefined) {
      alert("אנא התחבר כדי לצפות בהיטוריית ההזמנות שלך")
    }
    this.ordersApiService.getById(id!).subscribe(res => {
      if (!res.success) {
        alert(res.responseJSON.message)
        return
      }

      this.orders = res.message
    })
  }
}
