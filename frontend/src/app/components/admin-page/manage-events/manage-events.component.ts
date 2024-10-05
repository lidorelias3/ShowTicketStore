import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { EventsService } from 'src/app/services/events.service';
import { VenuesService } from 'src/app/services/venues.service';

@Component({
  selector: 'app-manage-events',
  templateUrl: './manage-events.component.html',
  styleUrls: ['./manage-events.component.scss']
})
export class ManageEventsComponent implements OnInit {
  showList = true;
  isNew = false;
  events: Event[]
  EventsTableObjects: any[] = []
  currentEvent: Event
  dateString: string | null = ''
  originalName: string

  constructor(private eventsService: EventsService, private venuesService: VenuesService) { }

  ngOnInit(): void {
    this.eventsService.getEvents().subscribe(res => {
      this.events = res.message
      this.EventsTableObjects = this.events.map((it) => { return { 'id': it._id, 'name': it.name, 'date': it.date } })
    })
  }

  delete(id: string) {
    var answer = confirm("האם ברצונך למחוק מופע זה?")

    if (!answer) {
      return
    }

    var eventName = this.events.filter(it => it._id == id)[0].name
    this.eventsService.removeEvent(eventName).subscribe(res => {
      if (res.success == false) {
        alert("התרחשה תקלה בעת מחיקת המופע, נסה שוב")
      }

      this.loadEvents()
    })
  }

  edit(id: string) {
    this.isNew = false;
    this.showList = false;
    this.currentEvent = this.events.filter(it => it._id == id)[0];
    this.originalName = this.currentEvent.name
    var pipe = new DatePipe("en")
    this.dateString = pipe.transform(this.currentEvent.date, 'dd-MM-yyyy')
  }


  newElement() {
    this.isNew = true;
    this.showList = false;
    this.currentEvent = {
      name: '',
      date: new Date(),
      tickets: [], 
      venueName: '',
      minimumAge: 0,
      description: '',
      profileImage: '',
      imagesPaths: [], 
    };
  }

  loadEvents() {
    this.events = []
    this.EventsTableObjects = []
    this.eventsService.getEvents().subscribe(res => {
      this.events = res.message
      this.EventsTableObjects = this.events.map((it) => { return { 'id': it._id, 'name': it.name, 'date': it.date } })
    })

    this.showList = true;
  }

  save() {
    if (this.dateString == undefined || this.dateString == null || this.dateString == '') {
      alert("עליך לבחור תאריך להופעה");
      return
    }

    if (this.currentEvent.venueName == '') {
      alert("עליך לבחור שם של אולם")
      return
    }

    if (this.currentEvent.name == '') {
      alert("אנא בחר שם למופע")
      return
    }

    if (this.currentEvent.tickets.filter(it => it.price <= 0).length > 0) {
      alert("אי אפשר שערך מחיר של כרטיס יהיה שלילי")
      return
    }

    this.currentEvent.date = new Date(this.dateString)

    if (this.isNew) {
      this.eventsService.addEvent(this.currentEvent)
      this.loadEvents()
    } else {
      alert("save")
      this.eventsService.updateExistingEvent(this.originalName, this.currentEvent).subscribe(_ =>{
          this.loadEvents()
      })
    }

    
  }

  getVenue() {
    var currentTickets = this.currentEvent.tickets.map(it => {return it.ticketType})
    this.venuesService.getVenueByName(this.currentEvent.venueName).subscribe(res => {
      if (res.success == false || res.message.length == 0) {
        alert ("אין אולם העונה לשם זה, בחר אחד אחר")
        return
      }
      var venueZones = res.message[0].zones.map((it: any) => {return {ticketType: it.name, price: 0}})
      venueZones.forEach((zone: any) => {
        if (currentTickets.includes(zone.ticketType)) {
          zone.price = this.currentEvent.tickets.filter(it => it.ticketType == zone.ticketType)[0].price
        }
      });

      this.currentEvent.tickets = venueZones;
    })
  }
}
