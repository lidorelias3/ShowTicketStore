import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { Event } from 'src/app/models/event.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-managment-page',
  templateUrl: './managment-page.component.html',
  styleUrls: ['./managment-page.component.scss'],
})
export class ManagmentPageComponent {
  manage = 'events'

  select(input: string) {
    this.manage = input
  }
}
