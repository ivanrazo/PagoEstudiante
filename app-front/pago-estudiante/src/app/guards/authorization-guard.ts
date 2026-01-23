import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const authorizationGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Si no está autenticado, redirige a login
  if (!authService.isAuthenticated) {
    return router.createUrlTree(['/login']);
  }

  // Roles requeridos para la ruta
  const requiredRoles: string[] = route.data['roles'] || [];
  const userRoles: string[] = authService.roles || [];

  // Verifica si el usuario tiene al menos un rol requerido
  const hasRole = userRoles.some(role => requiredRoles.includes(role));

  if (!hasRole) {
    // Redirige a acceso denegado si no tiene rol
    return router.createUrlTree(['/access-denied']);
  }

  return true; // tiene acceso
};
