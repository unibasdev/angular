import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Esame } from 'src/app/model/esame';
import { Studente } from 'src/app/model/studente';
import { C } from 'src/app/service/c';
import { DaoEsameService } from 'src/app/service/dao/dao-esame.service';
import { DaoStudenteService } from 'src/app/service/dao/dao-studente.service';
import { MessaggiService } from 'src/app/service/messaggi.service';
import { ModelloService } from 'src/app/service/modello.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-esame-form',
  templateUrl: './esame-form.component.html',
  styleUrls: ['./esame-form.component.css']
})
export class EsameFormComponent implements OnInit {

  public idEsameModificare?: number;

  formEsame = new FormGroup({
    insegnamento: new FormControl<string | null>(null, Validators.required),
    voto: new FormControl<number | null>(null, [Validators.required, Validators.min(18), Validators.max(30)]),
    crediti: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    lode: new FormControl<boolean>(false),
    dataRegistrazione: new FormControl<Date | null>(null, Validators.required),
  });

  constructor(private modello: ModelloService,
    private daoEsame: DaoEsameService,
    private daoStudente: DaoStudenteService,
    private messaggi: MessaggiService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    let stringaIdEsameModificare = this.route.snapshot.paramMap.get('idEs');
    if (stringaIdEsameModificare) {
      this.idEsameModificare = +stringaIdEsameModificare;
      let esame: Esame = this.modello.getBean(C.ESAME)!;
      this.campoInsegnamento.setValue(esame.insegnamento);
      this.campoVoto.setValue(esame.voto);
      this.campoLode.setValue(esame.lode);
      this.campoCrediti.setValue(esame.crediti);
      this.campoDataRegistrazione.setValue(esame.dataRegistrazione);
    }
  }

  salva() {
    const nuovoEsame = new Esame(
      this.campoInsegnamento.value!, this.campoVoto.value!,
      this.campoLode.value!, this.campoCrediti.value!, this.campoDataRegistrazione.value!);
      nuovoEsame.studenteId = this.studente.id!;
    if (this.idEsameModificare) {
      nuovoEsame.id = this.idEsameModificare;
      this.daoEsame.update(nuovoEsame)
        .then(_ => {
          this.messaggi.mostraMessaggioInformazioni("Esame modificato con successo");
          // if (environment.backendStrategy === 'MOCK') {
          //   this.studente.esami = this.studente.esami.filter(e => e.id !== this.idEsameModificare);
          //   this.studente.esami.push(nuovoEsame);
          //   this.daoStudente.update(this.studente);
          // }
          this.router.navigate(['/studenti/' + this.studente.id!]);
        })
        .catch(errore => this.messaggi.mostraMessaggioErrore("Errore durante il salvataggio dei dati: " + errore));

    } else {
      nuovoEsame.studenteId = this.studente.id;
      this.daoEsame.save(nuovoEsame)
        .then(_ => {
          this.messaggi.mostraMessaggioInformazioni("Esame salvato con successo");
          // if (environment.backendStrategy === 'MOCK') {
          //   this.studente.esami.push(nuovoEsame);
          //   this.daoStudente.update(this.studente);
          // }
          this.router.navigate(['/studenti/' + this.studente.id!]);
        })
        .catch(errore => this.messaggi.mostraMessaggioErrore("Errore durante il salvataggio dei dati: " + errore));
    }
  }

  get studente(): Studente {
    return this.modello.getBean(C.STUDENTE)!;
  }

  get esame() {
    return this.modello.getBean(C.ESAME);
  }

  get campoInsegnamento() {
    return this.formEsame.get('insegnamento')!;
  }

  get campoVoto() {
    return this.formEsame.get('voto')!;
  }

  get campoCrediti() {
    return this.formEsame.get('crediti')!;
  }

  get campoLode() {
    return this.formEsame.get('lode')!;
  }

  get campoDataRegistrazione() {
    return this.formEsame.get('dataRegistrazione')!;
  }
}
