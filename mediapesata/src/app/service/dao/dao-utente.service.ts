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

  private gestisciLoginMock(email: string, password: string): Promise<string> {
    let apiURL = environment.backendUrl + '/utenti';
    return lastValueFrom(this.httpClient.get<Utente[]>(apiURL).pipe(
      map(utenti => utenti.filter(utente => { return utente.email === email; })),
      tap(utenti => {
        if (utenti.length === 0) throw new Error('Utente con email ' + email + ' inesistente');
        let utente: any = utenti[0];
        if (utente.password !== password) throw new Error('Password scorretta');
        console.log('Utente trovato', utente);
      }),
      map(_ => 'mock-token')
    ));
  }

}
