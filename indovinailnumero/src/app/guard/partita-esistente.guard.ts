import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Partita } from '../model/partita';
import { C } from '../service/c';
import { ModelloService } from '../service/modello.service';

@Injectable({
  providedIn: 'root'
})
export class PartitaEsistenteGuard implements CanActivate {

  constructor(private router: Router,
    private modello: ModelloService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.modello.getBean<Partita>(C.PARTITA)) {
      this.router.navigate(['/nuova']);
      return false;
    }
    return true;
  }

}
