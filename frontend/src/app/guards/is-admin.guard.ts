import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const isAdminGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): boolean => {
  if(!inject(UserService).isAdmin()) {
    inject(Router).navigate([''])
    return false
  }

  return true;
};
