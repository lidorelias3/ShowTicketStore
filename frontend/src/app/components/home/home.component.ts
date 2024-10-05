import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @ViewChild('scrollElement', { static: false }) scrollElement: ElementRef;

  scrolldown() {
    this.scrollElement.nativeElement.scroll({
      top: this.scrollElement.nativeElement.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }
}
