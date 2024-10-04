import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ShowsService } from 'src/app/services/shows.service';

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
export class GaleryComponent {
  @ViewChild('galery', { static: false }) galery: ElementRef;

  showLeftArrow: boolean = true;
  showRightArrow: boolean = false;

  private scroll_size = 200;

  shows: any[]

  constructor(private showsService: ShowsService) { 
    this.shows = showsService.getAllShows()
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
}
