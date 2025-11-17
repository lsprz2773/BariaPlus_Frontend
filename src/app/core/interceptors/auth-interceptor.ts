import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';
import { environment } from '../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(Auth);
  const token = authService.getToken();

  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    if(environment.enableDebugMode) {
      console.log('🔐 AuthInterceptor - Token añadido a la solicitud:', clonedReq);
    }

    return next(clonedReq);
  }
  return next(req);
}
