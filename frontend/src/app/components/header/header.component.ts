import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  buttons: {title: string, route: string}[] = [
    {title: 'כניסה', route: '/login'},
    {title: 'הרשמה', route: '/register'},
    {title: 'דף ניהול', route: '/managment-page'},
    {title: 'העגלה שלי', route: '/my-cart'}
  ]
}
