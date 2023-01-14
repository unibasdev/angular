import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Studente } from 'src/app/model/studente';
import { C } from 'src/app/service/c';
import { ModelloService } from 'src/app/service/modello.service';

@Component({
  selector: 'app-studente',
  templateUrl: './studente.component.html',
  styleUrls: ['./studente.component.css']
})
export class StudenteComponent implements OnInit {

  constructor(private modello: ModelloService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    console.log('Inizializzo componente con studente ', this.studente.cognome);
    // this.activatedRoute.data.subscribe(({ studente }) => {
      // console.log('Cambiato studente', studente);
    //   this.modello.putBean(C.STUDENTE, studente);
    // })
  }

  get studente(): Studente {
    return this.modello.getBean(C.STUDENTE)!;
  }

}
