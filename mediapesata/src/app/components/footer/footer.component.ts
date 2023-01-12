import { Component } from '@angular/core';
import { Utente } from 'src/app/model/utente';
import { C } from 'src/app/service/c';
import { ModelloService } from 'src/app/service/modello.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(private modello: ModelloService) { }

  get utente(): Utente | undefined {
    return this.modello.getPersistentBean(C.UTENTE);
  }

}
