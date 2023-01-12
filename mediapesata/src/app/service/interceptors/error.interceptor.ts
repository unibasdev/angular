import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(httpError => {
        console.error("Errore durante la richiesta", httpError);
        if (httpError instanceof HttpErrorResponse && httpError.error) {
          let backendError = JSON.parse(httpError.error);
          if (backendError['error']) {
            httpError = backendError['error'];
          }
        }
        return throwError(() => httpError);
      })
    );
  }

}
