import { Injectable, OnDestroy } from '@angular/core';
import { AuthService } from './api/auth.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersApiService } from './api/users-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUser?: string = undefined;
  private currentUserIsAdmin?: boolean = false;

  constructor(private authService: AuthService, private router: Router, private userApiService: UsersApiService) { 
    const token = localStorage.getItem("authorizationToken");
    if (token) {
      this.authService.testAuthentication(token).subscribe(res => {
        if (res.success) {
          this.currentUser = res.detailes.userId;
          this.currentUserIsAdmin = res.detailes.isAdmin;
        }
      })
    }
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

  getCurrentUserID(): string | undefined {
    return this.currentUser
  }

  logout() {
    this.currentUser = undefined;
    this.currentUserIsAdmin = false;
    localStorage.removeItem("authorizationToken")
    this.router.navigate([""])
  }

  getAllUsers(filterFirstName? : string): Observable<any> {
    console.log('GetALlUsers', filterFirstName, 'common');
    return this.userApiService.getAllUsers(filterFirstName);
  }

  getUserByID(id: string) {
    return this.userApiService.getUserByID(id)
  }

  updateUser(user: User) {
    return this.userApiService.updateUser(user)
  }

  deleteUser(id: string) {
    return this.userApiService.deleteUser(id)
  }
}
