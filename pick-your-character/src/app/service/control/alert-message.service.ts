import {Injectable} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {ModelService} from '../model.service';
import {AlertMessage} from '../../model/alert-message';
import {C} from '../c';

@Injectable({
  providedIn: 'root'
})
export class AlertMessageService {

  constructor(private router: Router, private model: ModelService) {
    // clear alert message on route change
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        const alertMessage = this.model.getBean(C.ALERT_MESSAGE);
        if (alertMessage) {
          if (!(alertMessage as AlertMessage).keepAfterNavigation) {
            this.model.removeBean(C.ALERT_MESSAGE);
          }
        }
      }
    });
  }
}
