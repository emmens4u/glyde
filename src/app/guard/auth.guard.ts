import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const isLoggedIn = authService.isLoggedIn();
  const router = inject(Router);

  if (isLoggedIn) {
    return true; // User is logged in, allow access to the route
  }
  return router.navigateByUrl('/login'); // User is not logged in, redirect to login page
};
