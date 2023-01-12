import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, tap } from 'rxjs';
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

  // findById(idStudente: number): Promise<Studente> {
  //   // let url = 'http://localhost:8080/mediapesata-jersey/api/v1/studenti/' + idStudente;
  //   let url = 'api/studenti/' + idStudente;
  //   let authToken: string = this.modello.getPersistentBean(Costanti.AUTH_TOKEN);
  //   if (!authToken) {
  //     throw new Error("Token di autorizzazione assente!");
  //   }
  //   const options = {
  //     headers: { 'Authorization': 'Bearer ' + authToken }
  //   };
  //   return lastValueFrom(this.http.get<Studente>(url, options));
  // }

  // getEsamiStudente(idStudente: number): Promise<Esame[]> {
  //   // let url = 'http://localhost:8080/mediapesata-jersey/api/v1/studenti/' + idStudente + '/esami';
  //   let url = 'studenti/' + idStudente + '/esami';
  //   let authToken: string = this.modello.getPersistentBean(Costanti.AUTH_TOKEN);
  //   const options = {
  //     headers: { 'Authorization': 'Bearer ' + authToken }
  //   };
  //   return lastValueFrom(this.http.get<Esame[]>(url, options));
  // }

}
