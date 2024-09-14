import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  buttons: {title: string, route: string}[] = [
    {title: 'כניסה', route: '/form'},
    {title: 'הרשמה', route: '/form'},
    {title: 'דף ניהול', route: '/'},
    {title: 'העגלה שלי', route: '/'},
  ]
}
