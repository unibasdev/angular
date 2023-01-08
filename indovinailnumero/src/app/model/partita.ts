export class Partita {

  numeroDaIndovinare: number;
  numeroDiTentativi: number = 0;
  trovato: boolean = false;
  suggerimento: string = "";

  constructor(readonly nome: string) {
    this.numeroDaIndovinare = Math.round(Math.random() * 99) + 1;
    console.log("DEBUG: Numero da indovinare:", this.numeroDaIndovinare);
  }

  gestisciTentativo(tentativo: number): void {
    if (isNaN(tentativo)) {
      throw new Error("Attenzione: deve essere un numero");
    } else if (tentativo < 1 || tentativo > 100) {
      throw new Error("Attenzione: il numero deve essere compreso tra 1 e 100");
    }
    this.numeroDiTentativi++;
    if (tentativo == this.numeroDaIndovinare) {
      this.trovato = true;
      this.suggerimento = "Complimenti! Il numero da indovinare era " + tentativo;
    } else if (tentativo < this.numeroDaIndovinare) {
      this.suggerimento = "Prova con un numero piu' alto";
    } else if (tentativo > this.numeroDaIndovinare) {
      this.suggerimento = "Prova con un numero piu' basso";
    }
  }

}
