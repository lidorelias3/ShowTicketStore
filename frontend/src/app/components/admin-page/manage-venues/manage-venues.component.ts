import { Component, OnInit } from '@angular/core';
import { Venue } from 'src/app/models/venue.model';
import { EventsService } from 'src/app/services/events.service';
import { VenuesService } from 'src/app/services/venues.service';

@Component({
  selector: 'app-manage-venues',
  templateUrl: './manage-venues.component.html',
  styleUrls: ['./manage-venues.component.scss']
})
export class ManageVenuesComponent implements OnInit {
  showList = true;
  isNew = false;
  venues: Venue[]
  VenuesTableObjects: any[] = []
  currentVenue: Venue
  originalName: string

  constructor(private eventsService: EventsService, private venuesService: VenuesService) { }

  ngOnInit(): void {
    this.loadVenues()
  }

  delete(id: string) {
    var answer = confirm("האם ברצונך למחוק אולם זה וכל המופעים שמתרחשים בו?")

    if (!answer) {
      return
    }

    this.venuesService.removeVenue(id).subscribe(res => {
      if (res.success == false) {
        alert("התרחשה תקלה בעת מחיקת המופע, נסה שוב")
      }

      this.loadVenues()
    })
  }

  edit(id: string) {
    this.isNew = false;
    this.showList = false;
    this.currentVenue = this.venues.filter(it => it._id == id)[0];
    this.originalName = this.currentVenue.name
  }


  newElement() {
    this.isNew = true;
    this.showList = false;
    this.currentVenue = {
      name: '',
      location: {
        address: '',
        city: '', 
        state: '',
        country: '',
      },
      maxCapacity: 0,
      zones: []
    }
  }

  loadVenues() {
    this.venues = []
    this.VenuesTableObjects = []
    this.venuesService.getAllVenues().subscribe(res => {
      this.venues = res.message
      this.VenuesTableObjects = this.venues.map((it) => { return { 'id': it._id, 'name': it.name } })
    })

    this.showList = true;
  }

  addZone() {
    var zoneName = prompt("הכנס שם של אזור חדש")
    
    if (zoneName == null ) {
      return
    }
    this.currentVenue.zones.push({name: zoneName, capacity: 0})
  }

  save() {
    if (this.currentVenue.name == '') {
      alert("עליך לבחור שם של אולם")
      return
    }

    var totalZonesCapacity = this.currentVenue.zones.reduce((sum, it) =>  sum + it.capacity, 0)
    this.currentVenue.maxCapacity = totalZonesCapacity

    if (this.currentVenue.maxCapacity < 1) {
      alert("על האולם להכיל לפחות לקוח אחד")
      return
    }

    if (this.isNew) {
      this.venuesService.newVenue(this.currentVenue).subscribe(_ =>{
        this.loadVenues()
    })
    } else {
      this.venuesService.upateVenue(this.currentVenue).subscribe(_ =>{
          this.loadVenues()
      })
    }
  }
}
