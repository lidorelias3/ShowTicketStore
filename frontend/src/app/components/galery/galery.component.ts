import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-galery',
  templateUrl: './galery.component.html',
  styleUrls: ['./galery.component.scss'],
  animations: [
    trigger('opacity', [
      state('true', style({
        opacity: '1'
      })),
      state('false', style({
        opacity: '0.1'
      })),
      transition('* => *', animate('100ms ease'))
    ])
  ]
})
export class GaleryComponent implements OnInit {
  @ViewChild('galery', { static: false }) galery: ElementRef;

  showLeftArrow: boolean = true;
  showRightArrow: boolean = false;

  private scroll_size = 200;

  shows: Event[]

  minAge: number
  maxPrice: number
  venueName: string

  constructor(private showsService: EventsService) {}
  
  ngOnInit(): void { 
    this.reload()
  }

  scroll(times: number) {
    var element = this.galery.nativeElement;
    if (element) {
      var x = element.scrollLeft
      element.scroll({ left: x - times * this.scroll_size, behavior: 'smooth' })
      this.updateArrowsState()
    }
  }

  updateArrowsState(event?: any) {
    var element = this.galery.nativeElement
    if (element?.scrollLeft == 0) {
      this.showRightArrow = false;
    } else {
      this.showRightArrow = true;
    }

    if (element.getBoundingClientRect().width - element?.scrollLeft + 1 >= element?.scrollWidth) {
      this.showLeftArrow = false;
    } else {
      this.showLeftArrow = true;
    }
  }

  reload() {
    if (this.minAge < 0 || this.maxPrice < 0) {
      return
    }

    this.shows = []

    if (this.venueName === undefined || this.venueName.length <= 2) {
      this.showsService.getEvents(this.minAge, this.maxPrice, '').subscribe(res => {
        this.shows = res.message;
      })

      return
    }

    this.showsService.getEvents(this.minAge, this.maxPrice, this.venueName).subscribe(res => {
      this.shows = res.message;
    })
  }

  reloadOnChange() {
    if (this.venueName === undefined || this.venueName.length <= 2 || this.minAge < 0 || this.maxPrice < 0) {
      alert("אנא דאג שהמחיר המקסימלי לכרטיס או שהגיל המינימלי ללקוח הוא אי שלילי")
      return
    }

    this.shows = []

    this.showsService.getEvents(this.minAge, this.maxPrice, this.venueName).subscribe(res => {
      this.shows = res.message;
    })
  }
}
