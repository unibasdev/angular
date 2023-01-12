import { Component } from '@angular/core';
import { Studente } from 'src/app/model/studente';
import { C } from 'src/app/service/c';
import { ModelloService } from 'src/app/service/modello.service';

@Component({
  selector: 'app-lista-studenti',
  templateUrl: './lista-studenti.component.html',
  styleUrls: ['./lista-studenti.component.css']
})
export class ListaStudentiComponent {

  constructor(private modello: ModelloService) {
  }

  get listaStudenti(): Studente[] | undefined {
    return this.modello.getBean(C.LISTA_STUDENTI);
  }

}
