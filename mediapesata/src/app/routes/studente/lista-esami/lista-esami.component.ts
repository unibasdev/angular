import { Component, OnInit } from '@angular/core';
import { Esame } from 'src/app/model/esame';
import { Studente } from 'src/app/model/studente';
import { C } from 'src/app/service/c';
import { DaoEsameService } from 'src/app/service/dao/dao-esame.service';
import { DaoStudenteService } from 'src/app/service/dao/dao-studente.service';
import { MessaggiService } from 'src/app/service/messaggi.service';
import { ModelloService } from 'src/app/service/modello.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lista-esami',
  templateUrl: './lista-esami.component.html',
  styleUrls: ['./lista-esami.component.css']
})
export class ListaEsamiComponent implements OnInit {

  constructor(private modello: ModelloService,
    private daoStudente: DaoStudenteService,
    private daoEsame: DaoEsameService,
    private messaggi: MessaggiService) { }

  ngOnInit(): void {
    let studente: Studente = this.modello.getBean(C.STUDENTE)!;
    console.log('Studente: ', studente)
    this.aggiornaListaEsami(studente);
    this.aggiornaListaEsami(studente);
  }

  private aggiornaListaEsami(studente: Studente) {
    this.daoStudente.getEsamiStudente(studente.id!)
      .then(esami => studente.esami = esami)
      .catch(errore => this.messaggi.mostraMessaggioErrore('Impossibile leggere gli esami dello studente: ' + errore));
  }

  private aggiornaMediaPesata(studente: Studente) {
    this.daoStudente.getMediaPesata(this.studente.id!)
      .then(result => this.modello.putBean(C.MEDIA_PESATA, result))
      .catch(_ => this.messaggi.mostraMessaggioErrore('Impossibile ottenere la media pesata dello studente'));
  }

  get studente(): Studente {
    return this.modello.getBean(C.STUDENTE)!;
  }

  eliminaEsame(esame: Esame) {
    this.daoEsame.delete(esame.id!)
      .then(_ => {
        this.messaggi.mostraMessaggioInformazioni('Esame eliminato correttamente');
        // if(environment.backendStrategy === 'MOCK'){
        //   this.studente.esami = this.studente.esami.filter(e => e.id !== esame.id);
        //   this.daoStudente.update(this.studente);
        // }
        this.aggiornaListaEsami(this.studente);
        this.aggiornaMediaPesata(this.studente);
      })
      .catch(errore => this.messaggi.mostraMessaggioInformazioni('Impossibile eliminare l\'esame: ' + errore))
  }

}
