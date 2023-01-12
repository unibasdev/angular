import { InMemoryDbService } from "angular-in-memory-web-api";

export class InMemoryRepository extends InMemoryDbService {

  createDb() {
    console.log('Inizializzato db');
    let utenti = [
      { id: 1, email: "admin@unibas.it", password: "admin" },
      { id: 2, email: "prova@prova.it", password: "prova" },
    ];
    let studenti = [
      {
        id: 1, nome: 'Jack', cognome: 'Sparrow', matricola: '12345', annoIscrizione: 2023,
        esami: [{ id: 10, studenteId: 1, insegnamento: 'POO2', voto: 30, lode: true, crediti: 4, dataRegistrazione: new Date() }]
      },
      { id: 2, nome: 'John', cognome: 'Doe', matricola: '1984', annoIscrizione: 2023 },
      { id: 3, nome: 'Mario', cognome: 'Rossi', matricola: '1984', annoIscrizione: 2023 },
    ];
    return { utenti, studenti };
  }

}
