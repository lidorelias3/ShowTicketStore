import { Injectable, OnDestroy } from '@angular/core';
import { AuthService } from './api/auth.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUser?: User = undefined;
  private currentUserIsAdmin?: boolean = false;

  constructor(private authService: AuthService, private router: Router, private location: Location) { }


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
        this.currentUser = res.detailes.userId;
        this.currentUserIsAdmin = res.detailes.isAdmin;
        localStorage.setItem('authorizationToken', res.detailes.token);
        this.router.navigate([''])
      } else {
        this.currentUser = undefined
      }
    })
  }

  isAdmin(): boolean {
    return this.currentUser !== undefined && this.currentUserIsAdmin == true
  }

  isLoggedIn(): boolean {
    return this.currentUser !== undefined && this.currentUser !== null
  }

  logout() {
    this.currentUser = undefined;
  }
}
