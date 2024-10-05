import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Event } from 'src/app/models/event.model';
import { EventsService } from 'src/app/services/events.service';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent {
  id: string;
  show: Event;

  selectedType: string = '';

  constructor(private route: ActivatedRoute, private eventsService: EventsService,
    private ticketsService: TicketsService, private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'] || 0;
    }).unsubscribe();

    this.eventsService.getEventByID(this.id).subscribe(res => {
      this.show = res.message;
    })
  }

  addToCart() {
    if (this.selectedType == '') {
      alert("אנא בחר סוג כרטיס")
      return
    }

    this.ticketsService.addToCart(
      this.show,
      this.show.tickets.filter(it => it.ticketType == this.selectedType)[0]
    )

    alert(this.show.tickets.filter(it => it.ticketType == this.selectedType)[0].price)

    this.router.navigate([""])
  }
}
