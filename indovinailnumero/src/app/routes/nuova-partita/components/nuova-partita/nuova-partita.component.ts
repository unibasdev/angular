import { Component } from '@angular/core';
import { FormControl, RequiredValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Partita } from 'src/app/model/partita';
import { C } from 'src/app/service/c';
import { ModelloService } from 'src/app/service/modello.service';

@Component({
  selector: 'app-nuova-partita',
  templateUrl: './nuova-partita.component.html',
  styleUrls: ['./nuova-partita.component.scss']
})
export class NuovaPartitaComponent {

  campoNome = new FormControl<string>('', [Validators.required]);

  constructor(private modello: ModelloService, private router: Router) { }

  iniziaGioco(): void {
    console.log('Inizio una partita con il giocatore', this.campoNome.value);
    let partita = new Partita(this.campoNome.value!);
    this.modello.putBean(C.PARTITA, partita);
    this.router.navigate(["gioca"]);
  }

}
