export class Esame {

  public id?: number;
  public studenteId?: number;

  constructor(
    public insegnamento: string,
    public voto: number,
    public lode: boolean,
    public crediti: number,
    public dataRegistrazione: Date
  ) { }
}
