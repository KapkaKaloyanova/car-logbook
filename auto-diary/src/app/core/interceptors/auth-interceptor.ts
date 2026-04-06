import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('accessToken');

  if (token) {
    const cloneReq = req.clone({
      setHeaders: { 'X-Authorization': token }
    });
    return next(cloneReq);
  }
  return next(req)
};
