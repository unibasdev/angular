import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {finalize, map} from 'rxjs/operators';
import {ModelService} from '../model.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingInterceptorService implements HttpInterceptor {

  constructor(private model: ModelService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.model.loading = true;
    // console.log('HTTP request');
    return next.handle(request).pipe(
      map(value => {
        return value;
      }),
      finalize(() =>
        this.model.loading = false
      )
    );
  }
}
