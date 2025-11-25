import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const guestGuard: CanActivateFn = (): boolean | UrlTree => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // Wenn NICHT eingeloggt -> Login/Register erlaubt
  if (!auth.isLoggedIn()) {
    return true;
  }

  // Wenn eingeloggt -> direkt aufs Dashboard umleiten
  return router.createUrlTree(['/dashboard']);
};
