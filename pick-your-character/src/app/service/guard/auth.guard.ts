import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {environment} from '../../../environments/environment';
import {C} from '../c';
import {ModelService} from '../model.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private model: ModelService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.model.getBean(C.USER);
    if (user) {
      return true;
    }
    if (environment.production) {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    } else {
      // development stage
      this.model.putBean(C.USER, {
        id: 1,
        userName: 'test@user.com',
        firstName: 'Test',
        lastName: 'User',
        passwordHash: '',
        token: 'mock_token'
      });
      return true;
    }

    return false;
  }

}
