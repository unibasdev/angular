import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { C } from '../c';
import { DaoEsameService } from '../dao/dao-esame.service';
import { ModelloService } from '../modello.service';

@Injectable({
  providedIn: 'root'
})
export class EsameResolver implements Resolve<void> {

  constructor(private daoEsame: DaoEsameService, private modello: ModelloService) { }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const idEsame = route.params['idEs'];
    console.log('Devo leggere i dati dello studente ', idEsame);
    await this.daoEsame.findById(idEsame).then(
      esame => this.modello.putBean(C.ESAME, esame)
    ).catch(
      _ => { throw new Error('Esame con id ' + idEsame + ' sconosciuto')}
    );
  }
}
