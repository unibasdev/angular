import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModelloService } from '../modello.service';
import { C } from '../c';
import { Utente } from 'src/app/model/utente';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor(private modello: ModelloService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const utente = this.modello.getBean(C.UTENTE);
    if (utente) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${(utente as Utente).authKey}`
        }
      });
    }
    return next.handle(request);
  }
}
