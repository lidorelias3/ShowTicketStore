import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  if(!inject(UserService).isLoggedIn()) {
    inject(Router).navigate([''])
    return false
  }

  return true;
};
