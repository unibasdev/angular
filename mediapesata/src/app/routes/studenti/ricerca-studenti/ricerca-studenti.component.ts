import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { C } from 'src/app/service/c';
import { DaoStudenteService } from 'src/app/service/dao/dao-studente.service';
import { MessaggiService } from 'src/app/service/messaggi.service';
import { ModelloService } from 'src/app/service/modello.service';

@Component({
  selector: 'app-ricerca-studenti',
  templateUrl: './ricerca-studenti.component.html',
  styleUrls: ['./ricerca-studenti.component.css']
})
export class RicercaStudentiComponent implements OnInit {

  constructor(private modello: ModelloService,
    private daoStudente: DaoStudenteService,
    private messaggi: MessaggiService,
    private router: Router,
    private route: ActivatedRoute) { }

  formRicerca = new FormGroup({
    nome: new FormControl<string | null>(null),
    cognome: new FormControl<string | null>(null),
    annoIscrizione: new FormControl<number | null>(null)
  });

  ngOnInit(): void {
    this.formRicerca.get('cognome')!.setValue(this.route.snapshot.queryParams['cognome']);
    this.formRicerca.get('nome')!.setValue(this.route.snapshot.queryParams['nome']);
    this.formRicerca.get('annoIscrizione')!.setValue(this.route.snapshot.queryParams['annoIscrizione']);
    this.modello.removeBean(C.LISTA_STUDENTI); //Per evitare che navigando tramite 'Home' si visualizzino dati disallineati
  }

  ricercaStudenti(): void {
    this.daoStudente.findAllStudenti(
      this.formRicerca.get('cognome')!.value,
      this.formRicerca.get('nome')!.value,
      this.formRicerca.get('annoIscrizione')!.value
    ).then(studenti => this.modello.putBean(C.LISTA_STUDENTI, studenti))
      .catch(error => this.messaggi.mostraMessaggioErrore(error));
    this.router.navigate(['/studenti'], {
      queryParams:
      {
        'cognome': this.formRicerca.get('cognome')!.value,
        'nome': this.formRicerca.get('nome')!.value,
        'annoIscrizione': this.formRicerca.get('annoIscrizione')!.value
      }
    });
  }

}
