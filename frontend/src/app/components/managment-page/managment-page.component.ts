import { Component } from '@angular/core';


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
