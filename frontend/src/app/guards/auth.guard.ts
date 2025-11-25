import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (_route, state): boolean | UrlTree => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    return true;
  }

  // Wenn nicht eingeloggt -> auf Login-Seite und evtl. Ziel-URL merken
  return router.createUrlTree(
    ['/login'],
    { queryParams: { redirectTo: state.url } }
  );
};
