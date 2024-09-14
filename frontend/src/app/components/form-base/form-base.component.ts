import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-form-base',
  templateUrl: './form-base.component.html',
  styleUrls: ['./form-base.component.scss']
})
export class FormBaseComponent {
  @Input() isRegistration: boolean = true;
  @Input() helpText: string = 'כבר רשומים?';
  @Input() linkText?: string = 'לכניסה';
  @Input() link?: string = undefined;
  @Input() buttonText: string = '';

  @Output() buttonClick = new EventEmitter<User>();

  user: User = <User>{}

  submit() {
    this.buttonClick.emit(this.user);
  }
}
