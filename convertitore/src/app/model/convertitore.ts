export class Convertitore {

    storiaConversioni: string[] = [];

    converti(votoIn30mi: number): number {
        let votoIn110mi = votoIn30mi / 30.0 * 110;
        this.storiaConversioni.push(`Voto in 30mi: ${votoIn30mi} - Voto in 110mi ${votoIn110mi.toFixed(2)}`)
        return votoIn110mi;
    }

}