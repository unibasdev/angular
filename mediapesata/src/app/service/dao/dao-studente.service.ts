import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, map, tap } from 'rxjs';
import { Esame } from 'src/app/model/esame';
import { Studente } from 'src/app/model/studente';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DaoStudenteService {

  constructor(private httpClient: HttpClient) { }

  findAllStudenti(cognome: string | null, nome: string | null, annoIscrizione: number | null): Promise<Studente[]> {
    let apiURL = environment.backendUrl + '/studenti?';
    apiURL += cognome ? 'cognome=' + cognome + '&' : '';
    apiURL += nome ? 'nome=' + nome + '&' : '';
    apiURL += annoIscrizione ? 'annoIscrizione=' + annoIscrizione + '&' : '';
    return lastValueFrom(
      this.httpClient.get<Studente[]>(apiURL)
        .pipe(tap(result => console.log('Caricati ' + result.length + ' studenti')))
    );
  }

  findById(idStudente: number): Promise<Studente> {
    let apiURL = environment.backendUrl + '/studenti/' + idStudente;
    return lastValueFrom(this.httpClient.get<Studente>(apiURL));
  }

  getMediaPesata(idStudente: number): Promise<number> {
    if (environment.backendStrategy === 'MOCK') {
      return this.gestisciGetMediaPesataMock(idStudente);
    }
    let apiURL = environment.backendUrl + '/studenti/' + idStudente + '/mediapesata';
    return lastValueFrom(this.httpClient.get<number>(apiURL));
  }

  getEsamiStudente(idStudente: number): Promise<Esame[]> {
    if (environment.backendStrategy === 'MOCK') {
      return this.gestisciGetEsamiStudentiMock(idStudente);
    }
    let apiURL = environment.backendUrl + '/studenti/' + idStudente + '/esami';
    return lastValueFrom(this.httpClient.get<Esame[]>(apiURL));
  }

  save(studente: Studente): Promise<void> {
    let apiURL = environment.backendUrl + '/studenti';
    return lastValueFrom(this.httpClient.post<void>(apiURL, studente));
  }

  update(studente: Studente): Promise<void> {
    let apiURL = environment.backendUrl + '/studenti/' + studente.id!;
    return lastValueFrom(this.httpClient.put<void>(apiURL, studente));
  }

  //NECESSARIO SOLO PER L'IMPLEMENTAZIONE MOCK CON INMEMORYDBSERVICE
  private gestisciGetMediaPesataMock(idStudente: number): Promise<number> {
    return lastValueFrom(this.httpClient.get<Studente>(environment.backendUrl + '/studenti/' + idStudente)
      .pipe(map(studente => {
        if (!studente.esami) return 0.0;
        let sommaVotiPesati = 0;
        let sommaCrediti = 0;
        for (let esame of studente.esami) {
          sommaVotiPesati += esame.voto * esame.crediti;
          sommaCrediti += esame.crediti;
        }
        return (sommaVotiPesati / sommaCrediti) / 30 * 110;
      })));
  }

  private gestisciGetEsamiStudentiMock(idStudente: number): Promise<Esame[]> {
    // let apiURL = environment.backendUrl + '/studenti/' + idStudente;
    // return lastValueFrom(this.httpClient.get<Studente>(apiURL)
    //   .pipe(map(studente => studente.esami)));
    let apiURL = environment.backendUrl + '/esami?studenteId=' + idStudente;
    return lastValueFrom(this.httpClient.get<Esame[]>(apiURL));
  }

}

