import { Component, Input } from '@angular/core';
import { Utente } from 'src/app/model/utente';
import { C } from 'src/app/service/c';
import { ModelloService } from 'src/app/service/modello.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Input() public titolo?: string;

  constructor(private modello: ModelloService){}

  get utente(): Utente | undefined {
    return this.modello.getPersistentBean(C.UTENTE);
  }

}
