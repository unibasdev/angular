import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Partita } from '../model/partita';

@Injectable({
  providedIn: 'root'
})
export class DaoPartitaService {

  readonly BACKEND_URL = "http://BACKEND-MOCK/api/partite";

  constructor(private httpClient: HttpClient) { }

  findAll(): Promise<Partita[]> {
    return lastValueFrom(this.httpClient.get<Partita[]>(this.BACKEND_URL));
  }

  save(partita: Partita): Promise<void> {
    console.log("Salvo la partita ", partita);
    return lastValueFrom(this.httpClient.post<void>(this.BACKEND_URL, partita));
  }
}
