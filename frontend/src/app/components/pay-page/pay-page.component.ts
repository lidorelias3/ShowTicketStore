import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-pay-page',
  templateUrl: './pay-page.component.html',
  styleUrls: ['./pay-page.component.scss']
})
export class PayPageComponent implements AfterViewInit {
  @ViewChild('canvas', { static: false }) canvas: ElementRef;
  context: any

  loading: boolean = false;
  canPurchase: boolean = false
  writingMode: boolean = false;

  moveListener: () => void | undefined
  upListener: () => void | undefined
  downListener: () => void | undefined

  constructor(private router: Router, private ticketService: TicketsService, private renderer2: Renderer2) { }

  ngAfterViewInit(): void {
    var canvasE = this.canvas.nativeElement

    this.context = canvasE.getContext('2d');

    this.moveListener = this.renderer2.listen(canvasE, "pointermove", (event: any) => {
      if (!this.writingMode) return
      const [positionX, positionY] = this.getCursorPosition(event);
      this.context.lineTo(positionX, positionY);
      this.context.stroke();
      this.canPurchase = true
    })

    this.upListener = this.renderer2.listen(canvasE, "pointerup", (_) => {
      this.writingMode = false;
    })

    this.downListener = this.renderer2.listen(canvasE, "pointerdown", (event: any) => {
      this.writingMode = true;
      this.context.beginPath();
      const [positionX, positionY] = this.getCursorPosition(event);
      this.context.moveTo(positionX, positionY);
    })

    this.context.lineWidth = 3;
    this.context.lineJoin = this.context.lineCap = 'round';
    this.context.strokeStyle = '#BCBAD3'
  }

  processPayment() {
    // Simulate payment processing
    this.loading = true;
    
    this.ticketService.purchase().subscribe(res => {
      if (res === false) {
        this.loading = false
        return
      }

      this.loading = false
      if (res) {
        alert("הרכישה הסתיימה בהצלחה, נתראה ברכישה הבאה")
        this.router.navigate(['']);
      }
    })

    this.clear()
  }

  getCursorPosition(event: any) {
    var positionX = event.clientX - event.target.getBoundingClientRect().x;
    var positionY = event.clientY - event.target.getBoundingClientRect().y;
    return [positionX, positionY];
  }

  clear() {
    var canvasE = this.canvas.nativeElement
    this.context.clearRect(0, 0, canvasE.width, canvasE.height);
    this.canPurchase = false;
  }
}
