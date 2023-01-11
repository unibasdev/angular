import { Component, OnInit } from '@angular/core';
import { Partita } from 'src/app/model/partita';
import { C } from 'src/app/service/c';
import { DaoPartitaService } from 'src/app/service/dao/dao-partita.service';
import { ModelloService } from 'src/app/service/modello.service';

@Component({
  selector: 'app-lista-partite',
  templateUrl: './lista-partite.component.html',
  styleUrls: ['./lista-partite.component.css']
})
export class ListaPartiteComponent implements OnInit {

  constructor(private modello: ModelloService,  private daoPartita: DaoPartitaService){}

  ngOnInit(): void {
    this.daoPartita.findAll()
      .then(result => this.modello.putBean(C.PARTITE, result))
      .catch(error => console.error("Errore durante la lettura delle partite"));
  }

  get partite(): Partita[] | undefined {
    return this.modello.getBean(C.PARTITE);
  }

}
