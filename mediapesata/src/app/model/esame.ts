export class Esame {

  public id?: number;

  constructor(
    public insegnamento: string,
    public voto: number,
    public lode: boolean,
    public crediti: number,
    public dataRegistrazione: Date
  ) { }
}
