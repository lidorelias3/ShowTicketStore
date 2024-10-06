import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent {
  showList = true;
  isNew = false;
  users: User[]
  usersTableObjects: any[] = []
  currentUser: User

  delete(id: string) {

  }

  edit(id: string) {

  } 

  save() {
    
  }
}
