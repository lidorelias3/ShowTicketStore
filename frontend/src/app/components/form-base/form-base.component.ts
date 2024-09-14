import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-form-base',
  templateUrl: './form-base.component.html',
  styleUrls: ['./form-base.component.scss']
})
export class FormBaseComponent {
  @Input() isRegistration: boolean = false;
  @Input() helpText: string = '';
  @Input() linkText?: string = '';
  @Input() link?: string = '';
  @Input() buttonText: string = '';

  @Output() buttonClick = new EventEmitter<User>();

  user: User = <User>{}

  submit() {
    this.buttonClick.emit(this.user);
  }
}
