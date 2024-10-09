import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  showList = true;
  users: User[]
  usersTableObjects: any[] = []
  currentUser: User
  
  constructor(private usersService: UserService) { }

  ngOnInit(): void {
    this.loadUsers()
  }

  loadUsers(searchName ? : string) {
    this.users = []
    this.usersTableObjects = []
    this.usersService.getAllUsers(searchName).subscribe(res => {
      this.users = res.message
      this.usersTableObjects = this.users.map((it) => { return { 'id': it._id, 'name': it.firstName + ' ' + it.lastName } })
    })

    this.showList = true;
  }

  delete(id: string) {
    this.usersService.deleteUser(id).subscribe(_ => {
      this.loadUsers()
    })
  }

  edit(id: string) {
    this.showList = false;
    this.currentUser = this.users.filter(it => it._id == id)[0];
  }

  save() {
    this.validateUser()

    this.usersService.updateUser(this.currentUser).subscribe(_ => {
      this.loadUsers()
    })
  }

  validateUser() {
    return !(this.currentUser.age < 0
      || this.currentUser.email == ''
      || this.currentUser.firstName == ''
      || this.currentUser.lastName == '')
  }
}
