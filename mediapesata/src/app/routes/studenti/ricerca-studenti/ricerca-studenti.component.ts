import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ricerca-studenti',
  templateUrl: './ricerca-studenti.component.html',
  styleUrls: ['./ricerca-studenti.component.css']
})
export class RicercaStudentiComponent {

  formRicerca = new FormGroup({
    nome: new FormControl<string>(''),
    cognome: new FormControl<string>(''),
    annoIscrizione: new FormControl<number|undefined>(undefined)
  });

  ricercaStudenti(): void{

  }

}
