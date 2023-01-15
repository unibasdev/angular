import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Studente } from 'src/app/model/studente';
import { C } from 'src/app/service/c';
import { DaoStudenteService } from 'src/app/service/dao/dao-studente.service';
import { MessaggiService } from 'src/app/service/messaggi.service';
import { ModelloService } from 'src/app/service/modello.service';

@Component({
  selector: 'app-dettaglio-studente',
  templateUrl: './dettaglio-studente.component.html',
  styleUrls: ['./dettaglio-studente.component.css']
})
export class DettaglioStudenteComponent implements OnInit {

  constructor(private modello: ModelloService,
    private daoStudenti: DaoStudenteService,
    private messaggi: MessaggiService) { }

  ngOnInit(): void {
    console.log("Inizializzo il componente DettaglioStudenteComponent.");
    this.daoStudenti.getMediaPesata(this.studente.id!)
      .then(result => this.modello.putBean(C.MEDIA_PESATA, result))
      .catch(_ => this.messaggi.mostraMessaggioErrore('Impossibile ottenere la media pesata dello studente'));;
  }

  get studente(): Studente {
    return this.modello.getBean(C.STUDENTE)!;
  }

  get mediaPesata(): number {
    return this.modello.getBean(C.MEDIA_PESATA)!;
  }
}
