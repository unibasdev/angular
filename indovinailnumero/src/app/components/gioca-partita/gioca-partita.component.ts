import { Component } from '@angular/core';
import { Partita } from 'src/app/model/partita';
import { C } from 'src/app/service/c';
import { ModelloService } from 'src/app/service/modello.service';

@Component({
  selector: 'app-gioca-partita',
  templateUrl: './gioca-partita.component.html',
  styleUrls: ['./gioca-partita.component.scss']
})
export class GiocaPartitaComponent {

  tentativo: number = 50;
  partitaInterrotta: boolean = false;

  constructor(private modello: ModelloService) {

  }

  get partita(): Partita {
    return this.modello.getBean<Partita>(C.PARTITA)!;
  }

  controllaTentativo(): void {
    console.log('Controllo il tentativo', this.tentativo)
    this.partita.gestisciTentativo(this.tentativo);
  }

  interrompiPartita(): void {
    this.partitaInterrotta = true;
  }

}
