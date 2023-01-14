import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Studente } from 'src/app/model/studente';
import { C } from '../c';
import { DaoStudenteService } from '../dao/dao-studente.service';
import { ModelloService } from '../modello.service';

@Injectable({
  providedIn: 'root'
})
export class StudenteResolver implements Resolve<void> {

  constructor(private daoStudente: DaoStudenteService, private modello: ModelloService) { }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const idStudente = route.params['idSt'];
    console.log('Devo leggere i dati dello studente ', idStudente);
    await this.daoStudente.findById(idStudente).then(
      studente => this.modello.putBean(C.STUDENTE, studente)
    ).catch(
      _ => { throw new Error('Studente con id ' + idStudente + ' sconosciuto')}
    );
  }
}
