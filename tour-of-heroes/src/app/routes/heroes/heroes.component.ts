import {Component, OnInit} from '@angular/core';
import {C} from "../../service/c";
import {Hero} from "../../model/hero";
import {HeroDAOService} from "../../service/dao/hero.dao.service";
import {ModelService} from "../../service/model.service";

@Component({
  selector: 'app-heroes_',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  isLoaded: boolean = false;
  heroName: string = '';

  constructor(
    private heroService: HeroDAOService,
    private modello: ModelService
  ) {
  }

  get heroes(): Hero[] {
    return this.modello.getBean<Hero[]>(C.HEROES)!;
  }

  ngOnInit() {
    // NOTA: in questo modo la lista degli eroi non viene mai aggiornata
    // durante la sessione di lavoro; commentare il blocco per aggiornarla ad ogni richiesta
    // ---
    // let heroes_: Hero[] = this.modello.getTypedList(C.HEROES, Hero);
    // if (heroes_) {
    //    this.isLoaded = true;
    //    return;
    // }
    // ---
    this.isLoaded = false;
    this.heroService.getHeroes().subscribe(heroes => {
      this.modello.putBean(C.HEROES, heroes);
      this.isLoaded = true;
    });
  }

  onSelect(hero: Hero) {
    this.modello.putBean(C.SELECTED_HERO, hero);
  }

  addHero(): void {
    this.heroName = this.heroName.trim();
    if (!this.heroName) {
      return;
    }
    this.heroService.addHero({name: this.heroName} as Hero).subscribe(hero => {
      this.heroes.push(hero);
    });
  }

  deleteHero(hero: Hero): void {
    this.heroService.deleteHero(hero).subscribe();
    let heroes = this.modello.getBean<Hero[]>(C.HEROES)!;
    let index: number = heroes.findIndex(h => h === hero);
    heroes.splice(index, 1);
  }

}
