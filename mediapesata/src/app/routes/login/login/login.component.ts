import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Utente } from 'src/app/model/utente';
import { C } from 'src/app/service/c';
import { DaoUtenteService } from 'src/app/service/dao/dao-utente.service';
import { MessaggiService } from 'src/app/service/messaggi.service';
import { ModelloService } from 'src/app/service/modello.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private daoUtente: DaoUtenteService,
    private modello: ModelloService,
    private messaggi: MessaggiService,
    private router: Router) { }

  formLogin = new FormGroup({
    email: new FormControl<string>('admin@unibas.it', [Validators.required, Validators.email]),
    password: new FormControl<string>('admin', Validators.required)
  });

  ngOnInit(): void {
    this.modello.clear();
  }

  get campoEmail() {
    return this.formLogin.get('email')!;
  }

  get campoPassword() {
    return this.formLogin.get('password')!;
  }

  login(): void {
    console.log("Effettuo il login");
    this.daoUtente.login(this.campoEmail.value!, this.campoPassword.value!)
      .then(
        token => {
          console.log('Ottenuto un token di risposta ', token);
          let utente = new Utente(this.campoEmail.value!, token);
          this.modello.putPersistentBean(C.UTENTE, utente);
          this.router.navigate(['/studenti']);
        }
      ).catch(
        errore => {
          this.messaggi.mostraMessaggioErrore(errore);
        }
      );
  }

}
