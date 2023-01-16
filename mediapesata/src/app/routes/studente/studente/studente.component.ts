import { Component, OnInit } from '@angular/core';
import { Studente } from 'src/app/model/studente';
import { C } from 'src/app/service/c';
import { ModelloService } from 'src/app/service/modello.service';

@Component({
  selector: 'app-studente',
  templateUrl: './studente.component.html',
  styleUrls: ['./studente.component.css']
})
export class StudenteComponent implements OnInit {

  constructor(private modello: ModelloService) { }

  ngOnInit(): void {
    console.log('Inizializzo componente con studente ', this.studente.cognome);
  }

  get studente(): Studente {
    return this.modello.getBean(C.STUDENTE)!;
  }

}
