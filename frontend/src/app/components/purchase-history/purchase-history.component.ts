import { ResourceLoader } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { Order } from 'src/app/models/order.model';
import { User } from 'src/app/models/user.model';
import { OrdersApiService } from 'src/app/services/api/orders-api.service';
import { EventsService } from 'src/app/services/events.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.scss']
})
export class PurchaseHistoryComponent implements OnInit {
  @Input() watchAll: boolean = false

  ordersEvents: { event: Event, order: Order, user?: User }[] = []
  events: Event[] = []
  users: User[] = []

  searchedPrice: number


  constructor(private userService: UserService, private ordersApiService: OrdersApiService,
    private eventsService: EventsService
  ) { }

  ngOnInit(): void {
    this.loadOrders()
  }

  loadOrders() {


    this.eventsService.getEvents().subscribe(events => {
      this.events = events.message;


      if (this.watchAll) {
        this.userService.getAllUsers().subscribe(users=> {
          this.users = users.message;
          this.ordersApiService.getAll(this.searchedPrice).subscribe(res => {
            if (!res.success) {
              alert(res.responseJSON.message)
              alert(res.responseJSON.detailes)
              return
            }
  
            this.ordersEvents = res.message.map((it: Order) => { return { 
              event: this.events.filter(e => e._id == it.eventId)[0], 
              order: it,
              user: this.users.filter(u => u._id == it.userId)[0]  
            } })
          })
  
        })
        
        return
      }

      var id = this.userService.getCurrentUserID()

      if (id === undefined) {
        alert("אנא התחבר כדי לצפות בהיטוריית ההזמנות שלך")
        return
      }

      console.log('asdasd', this.searchedPrice);
      this.ordersApiService.getById(id!, this.searchedPrice).subscribe(res => {
        if (!res.success) {
          alert(res.responseJSON.message)
          return
        }

        this.ordersEvents = res.message.map((it: Order) => { return { event: this.events.filter(e => e._id == it.eventId)[0], order: it } })
      })
    })
  }


  delete(id: string) {
    this.ordersApiService.delete(id).subscribe(res=> {
      if (res.success) {
        alert("ההזמנה נמחקה בהצלחה") 
        this.loadOrders()
        return
      }

      alert(`התרחשה תקלה בעת מחיקת ההזמנה. פירוט: ${res.responseJSON.message}`)
    })
  }
}
