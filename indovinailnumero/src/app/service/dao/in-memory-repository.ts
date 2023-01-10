import { InMemoryDbService } from "angular-in-memory-web-api";

export class InMemoryRepository extends InMemoryDbService {

  createDb() {
    console.log('Inizializzato db');
    let partite = [
      { id: 1, nome: "John", numeroDaIndovinare: 80, numeroDiTentativi: 3, trovato: true },
      { id: 2, nome: "John", numeroDaIndovinare: 1, numeroDiTentativi: 5, trovato: false },
      { id: 3, nome: "John", numeroDaIndovinare: 19, numeroDiTentativi: 4, trovato: true },
      { id: 4, nome: "Mike", numeroDaIndovinare: 75, numeroDiTentativi: 2, trovato: true }
    ];
    return { partite };
  }

}
