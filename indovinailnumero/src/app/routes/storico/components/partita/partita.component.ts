import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Partita } from 'src/app/model/partita';

@Component({
  selector: 'app-partita',
  templateUrl: './partita.component.html',
  styleUrls: ['./partita.component.css']
})
export class PartitaComponent {

  @Input() partita?: Partita;
  @Output() elimina = new EventEmitter();


  eliminaPartita() {
    this.elimina.emit();
  }

}
