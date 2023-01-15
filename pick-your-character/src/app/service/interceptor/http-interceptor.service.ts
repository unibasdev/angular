import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ModelService} from '../model.service';
import {User} from 'src/app/model/user/user';
import {C} from '../c';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private model: ModelService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = this.model.getBean(C.USER);
    if (user) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${(user as User).token}`
        }
      });
    }
    return next.handle(request);
  }

}
