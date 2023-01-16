import { Component, OnInit } from '@angular/core';
import { Studente } from 'src/app/model/studente';
import { C } from 'src/app/service/c';
import { DaoStudenteService } from 'src/app/service/dao/dao-studente.service';
import { MessaggiService } from 'src/app/service/messaggi.service';
import { ModelloService } from 'src/app/service/modello.service';

@Component({
  selector: 'app-lista-studenti',
  templateUrl: './lista-studenti.component.html',
  styleUrls: ['./lista-studenti.component.css']
})
export class ListaStudentiComponent {

  test() {
    this.modello.putBean(C.CARICAMENTO, true);
  }

  constructor(private modello: ModelloService) {
  }

  get listaStudenti(): Studente[] | undefined {
    return this.modello.getBean(C.LISTA_STUDENTI);
  }

}
