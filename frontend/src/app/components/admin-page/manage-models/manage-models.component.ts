import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-manage-models',
  templateUrl: './manage-models.component.html',
  styleUrls: ['./manage-models.component.scss']
})
export class ManageModelsComponent {
  @Output() editEvent = new EventEmitter<string>()
  @Output() deleteEvent = new EventEmitter<string>()
  @Output() newEvent = new EventEmitter<undefined>()

  @Input() models: {'id': string, 'name': string, date?: string}[]
  @Input() title: string
  @Input() buttonTitle: string

  // shows: Event[]

  constructor(private showsService: EventsService) { }

  // ngOnInit(): void {
  //   this.showsService.getEvents().subscribe(res => {
  //     this.shows = res.message;
  //   })
  // }

  delete(id?: string) {
    this.deleteEvent.emit(id)
  }

  edit(id?: string) {
    this.editEvent.emit(id)
  }

  add() {
    this.newEvent.emit()
  }
}
