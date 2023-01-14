import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, filter, first, lastValueFrom, map, tap, throwError } from 'rxjs';
import { Utente } from 'src/app/model/utente';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DaoUtenteService {

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string): Promise<string> {
    if (environment.backendStrategy === 'MOCK') {
      return this.gestisciLoginMock(email, password);
    }
    let apiURL = environment.backendUrl + '/utenti/login';
    return lastValueFrom(
      this.httpClient.post(apiURL, { email: email, password: password }, { responseType: 'text' })
        .pipe(
          tap(response => {
            console.log('Ricevuta risposta ', response);
            if (!response) throw new Error("Token di autorizzazione assente");
          })
        )
    );
  }

  //NECESSARIO SOLO PER L'IMPLEMENTAZIONE MOCK CON INMEMORYDBSERVICE
  private gestisciLoginMock(email: string, password: string): Promise<string> {
    let apiURL = environment.backendUrl + '/utenti';
    return lastValueFrom(this.httpClient.get<Utente[]>(apiURL).pipe(
      map(utenti => this.cercaUtente(utenti, email, password))
    ));
  }

  private cercaUtente(utenti: Utente[], email: string, password: string): string{
    let utente = utenti.find(u => u.email === email && (u as any).password === password);
    if (!utente) throw new Error('Credenziali scorrette');
    return 'token-mock';
  }
}
