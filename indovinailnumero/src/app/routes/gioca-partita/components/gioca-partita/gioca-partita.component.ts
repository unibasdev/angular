import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Partita } from 'src/app/model/partita';
import { C } from 'src/app/service/c';
import { DaoPartitaService } from 'src/app/service/dao/dao-partita.service';
import { ModelloService } from 'src/app/service/modello.service';

@Component({
  selector: 'app-gioca-partita',
  templateUrl: './gioca-partita.component.html',
  styleUrls: ['./gioca-partita.component.css']
})
export class GiocaPartitaComponent {

  campoTentativo = new FormControl<number>(50, [Validators.required, Validators.min(1), Validators.max(100)]);
  partitaInterrotta: boolean = false;

  constructor(private modello: ModelloService, private daoPartita: DaoPartitaService) {
  }

  get partita(): Partita {
    return this.modello.getBean<Partita>(C.PARTITA)!;
  }

  controllaTentativo(): void {
    console.log('Controllo il tentativo', this.campoTentativo.value)
    this.partita.gestisciTentativo(this.campoTentativo.value!);
    if (this.partita.trovato) {
      this.campoTentativo.disable();
      this.salvaRisultatoPartita();
    }
  }

  interrompiPartita(): void {
    this.partitaInterrotta = true;
    this.campoTentativo.disable();
    this.salvaRisultatoPartita();
  }

  nuovaPartita(): void {
    this.campoTentativo.enable();
    this.partitaInterrotta = false;
    this.campoTentativo.setValue(50);
    this.modello.putBean(C.PARTITA, new Partita(this.partita.nome));
  }

  get partitaNonInCorso(){
    return this.partita.trovato || this.partitaInterrotta;
  }

  private salvaRisultatoPartita(): void {
    console.log('Salvo il risultato della partita ', this.partita);
    this.daoPartita.save(this.partita)
      .catch(result => console.log("Errore durante il salvataggio", result));
  }

}
