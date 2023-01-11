import { Component, OnInit } from '@angular/core';
import { Partita } from 'src/app/model/partita';
import { DaoPartitaService } from 'src/app/service/dao/dao-partita.service';

@Component({
  selector: 'app-lista-partite',
  templateUrl: './lista-partite.component.html',
  styleUrls: ['./lista-partite.component.css']
})
export class ListaPartiteComponent implements OnInit {

  public partite?: Partita[];

  constructor(private daoPartita: DaoPartitaService){}

  ngOnInit(): void {
    this.daoPartita.findAll()
      .then(result => this.partite = result)
      .catch(error => console.error("Errore durante la lettura delle partite"));
  }

}
