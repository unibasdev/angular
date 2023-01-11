import { Component, Input, OnInit } from '@angular/core';
import { Partita } from 'src/app/model/partita';

@Component({
  selector: 'app-partita',
  templateUrl: './partita.component.html',
  styleUrls: ['./partita.component.css']
})
export class PartitaComponent {

  @Input() public partita?: Partita;
}
