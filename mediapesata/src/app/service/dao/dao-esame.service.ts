import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Esame } from 'src/app/model/esame';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DaoEsameService {

  constructor(private httpClient: HttpClient) { }

  findById(idEsame: number): Promise<Esame> {
    let apiURL = environment.backendUrl + '/esami/' + idEsame;
    return lastValueFrom(this.httpClient.get<Esame>(apiURL));
  }

  save(esame: Esame): Promise<void> {
    let apiURL = environment.backendUrl + '/esami';
    return lastValueFrom(this.httpClient.post<void>(apiURL, esame));
  }

  update(esame: Esame): Promise<void> {
    let apiURL = environment.backendUrl + '/esami/' + esame.id!;
    return lastValueFrom(this.httpClient.put<void>(apiURL, esame));
  }

  delete(idEsame: number): Promise<void> {
    let apiURL = environment.backendUrl + '/esami/' + idEsame!;
    return lastValueFrom(this.httpClient.delete<void>(apiURL));
  }
}
