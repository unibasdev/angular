import { Component } from '@angular/core';
import { DaoPartitaService } from 'src/app/dao/dao-partita.service';
import { Partita } from 'src/app/model/partita';
import { Statistiche } from 'src/app/model/statistiche';
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
  statistiche?: Statistiche;

  constructor(private modello: ModelloService, private daoPartita: DaoPartitaService) {
    this.tentativo = this.modello.getBean<Partita>(C.PARTITA)!.numeroDaIndovinare;
  }

  ngOnInit() {
    console.log('Inizializzo il componente gioca-partita');
    this.leggiArchivioPartite();
  }

  get partita(): Partita {
    return this.modello.getBean<Partita>(C.PARTITA)!;
  }

  controllaTentativo(): void {
    console.log('Controllo il tentativo', this.tentativo)
    this.partita.gestisciTentativo(this.tentativo);
    if (this.partita.trovato) {
      this.salvaRisultatoPartita();
    }
  }

  interrompiPartita(): void {
    this.partitaInterrotta = true;
    this.salvaRisultatoPartita();
  }

  nuovaPartita(): void {
    this.partitaInterrotta = false;
    this.tentativo = 50;
    this.modello.putBean(C.PARTITA, new Partita(this.partita.nome));
    this.tentativo = this.modello.getBean<Partita>(C.PARTITA)!.numeroDaIndovinare;
  }

  get partitaNonInCorso(){
    return this.partita.trovato || this.partitaInterrotta;
  }

  private salvaRisultatoPartita(): void {
    console.log('Salvo il risultato della partita ', this.partita);
    this.daoPartita.save(this.partita)
      .then(result => this.leggiArchivioPartite())
      .catch(result => console.log("Errore durante il salvataggio", result));
  }

  private leggiArchivioPartite(): void {
    this.daoPartita.findAll()
      .then(result => this.calcolaStatistiche(result))
      .catch(result => console.log("Errore durante il calcolo delle statistiche", result));
  }

  private calcolaStatistiche(partite: Partita[]): void {
    console.log("L'archivio contiene " + partite.length + " partite");
    let statistiche = new Statistiche();
    partite.forEach(partita => {
      console.log(partita);
      statistiche.partiteComplessive++;
      if (partita.trovato) {
        statistiche.vittorieComplessive++;
        if (statistiche.recordComplessive === undefined || partita.numeroDiTentativi < statistiche.recordComplessive) statistiche.recordComplessive = partita.numeroDiTentativi;
      }
      if (partita.nome === this.partita.nome) {
        statistiche.partiteUtente++;
        if (partita.trovato) {
          statistiche.vittorieUtente++;
          if (statistiche.recordUtente === undefined || partita.numeroDiTentativi < statistiche.recordUtente) statistiche.recordUtente = partita.numeroDiTentativi;
        }
      }
    });
    this.statistiche = statistiche;
  }

}
