import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, lastValueFrom, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DaoUtenteService {

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string): Promise<string> {
    let apiURL = environment.backendUrl + '/utenti/login';
    return lastValueFrom(
      this.httpClient.post(apiURL, { email: email, password: password }, { responseType: 'text' })
        .pipe(
          tap(response => console.log('Ricevuta risposta ', response)),
        )
    );
  }
}
