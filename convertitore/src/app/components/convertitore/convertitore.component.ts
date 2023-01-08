import { Component } from '@angular/core';
import { Convertitore } from 'src/app/model/convertitore';
import { C } from 'src/app/service/c';
import { ModelloService } from 'src/app/service/model.service';

@Component({
  selector: 'app-convertitore',
  templateUrl: './convertitore.component.html',
  styleUrls: ['./convertitore.component.css']
})
export class ConvertitoreComponent {

  constructor(
    private modello: ModelloService
  ) { }

  votoIn30mi: string = '';
  votoIn110mi: string = '';
  errore: string = '';

  get storiaConversioni(): string[] {
    return this.modello.getBean<Convertitore>(C.CONVERTITORE)!.storiaConversioni;
  }

  get haConversioni(): boolean {
    return this.storiaConversioni.length > 0;
  }

  converti(): void {
    this.errore = this.convalida(this.votoIn30mi);
    if (!!this.errore) {
      this.votoIn110mi = ''
      return;
    }
    let convertitore : Convertitore = this.modello.getBean<Convertitore>(C.CONVERTITORE)!;
    this.votoIn110mi = convertitore.converti(parseInt(this.votoIn30mi)).toFixed(2);
  }

  convalida(votoIn30mi: string): string {
    if (!votoIn30mi) return "Devi specificare il voto in trentesimi";
    let numero : number = parseInt(votoIn30mi)
    if (!numero) return "Il voto in trentesimi deve essere un numero intero"
    if (numero < 18 || numero > 30) return "Il voto in trentesimi deve essere compreso tra 18 e 30";
    return '';
  }

}
