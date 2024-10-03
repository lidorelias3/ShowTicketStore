import { Injectable, OnDestroy } from '@angular/core';
import { AuthService } from './api/auth.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {

  private currentUser?: User = undefined;

  constructor(private authService: AuthService, private router: Router, private location: Location) { }
  ngOnDestroy(): void {
    this.logout()
  }

  register(user: User) {
    this.authService.register(user).subscribe(res => {
      if (!res.success) {
        alert("ההרשמה נכשלה, אנא וודאו את תקינות הפרמטרים")
        return
      }

      this.router.navigate(["/login"])
    })
  }

  login(user: User) {
    this.authService.login(user).subscribe(res => {
      if (res) {
        this.currentUser = res.message;
        alert(this.currentUser.age)
        this.router.navigate([''])
      }
    })
  }

  // this is not working yet, i need to make this a subject to make the changes noticeable
  isAdmin(): boolean {
    return this.currentUser !== undefined && this.currentUser.isAdmin
  }

  isLoggedIn(): boolean {
    return this.currentUser !== undefined && this.currentUser !== null
  }

  logout() {
    this.currentUser = undefined;
  }
}
