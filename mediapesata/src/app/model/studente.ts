import { Esame } from "./esame";

export class Studente {

  public id?: number;

  constructor(
    public nome: string,
    public cognome: string,
    public matricola: number,
    public annoIscrizione: number) { }

}
