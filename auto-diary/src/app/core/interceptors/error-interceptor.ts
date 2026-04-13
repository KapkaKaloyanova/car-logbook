import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

const AUTH_ENDPOINTS = ['/users/login', '/users/register'];

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notifService = inject(NotificationService);
  const authService = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      let message = 'Unexpected error occured';

      if (err.error instanceof ErrorEvent) {
        message = err.error.message; // client-side error network or browser
      } else if (err.status === 0) {
        message = 'Can not connect to the server. Check your internet connection';
      } else if (err.status === 400) {
        message = err.error?.message || 'Bad request';
      } else if (err.status === 401) {
        // Проверяваме дали текущият URL съдържа някой от нашите Auth пътища
        const isAuthRequest = AUTH_ENDPOINTS.some(endpoint => req.url.includes(endpoint));
        if (isAuthRequest) {
          message = 'Invalid email or password';
        } else {
          message = 'Session expired. Please log in again';
          authService.clearSession();
          router.navigate(['/login']);
        }
      } else if (err.status === 403) {
        // Проверяваме дали текущият URL съдържа някой от нашите Auth пътища
        const isAuthRequest = AUTH_ENDPOINTS.some(endpoint => req.url.includes(endpoint));
        if (isAuthRequest) {
          message = 'Forbidden. You do not have permission for this action';
        } else{
          message = 'Session expired. Please log in again';
          authService.clearSession();
          router.navigate(['/login']);
        }
      } else if (err.status === 404) {
        message = 'Resource not found';
      } else if (err.status === 409) {
        message = 'This email or username is already taken';
      } else if (err.status >= 500) {
        message = 'Internal server error! Try again later';
      } else if (err.error?.message) {// за всички останали случаи, когато сървъра праща грешка
        message = err.error.message ;
      }

      notifService.error(message);

      return throwError(() => err);
    })
  );
};
