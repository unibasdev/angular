import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { C } from 'src/app/service/c';
import { DaoStudenteService } from 'src/app/service/dao/dao-studente.service';
import { MessaggiService } from 'src/app/service/messaggi.service';
import { ModelloService } from 'src/app/service/modello.service';

@Component({
  selector: 'app-ricerca-studenti',
  templateUrl: './ricerca-studenti.component.html',
  styleUrls: ['./ricerca-studenti.component.css']
})
export class RicercaStudentiComponent {

  constructor(private modello: ModelloService,
    private daoStudente: DaoStudenteService,
    private messaggi: MessaggiService) { }

  formRicerca = new FormGroup({
    nome: new FormControl<string | null>(null),
    cognome: new FormControl<string | null>(null),
    annoIscrizione: new FormControl<number | null>(null)
  });

  ricercaStudenti(): void {
    this.daoStudente.findAllStudenti(
      this.formRicerca.get('cognome')!.value,
      this.formRicerca.get('nome')!.value,
      this.formRicerca.get('annoIscrizione')!.value
    )
      .then(studenti => this.modello.putBean(C.LISTA_STUDENTI, studenti))
      .catch(error => this.messaggi.mostraMessaggioErrore(error))
  }

}
