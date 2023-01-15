import {Component, OnInit} from '@angular/core';
import {C} from "../../service/c";
import {Hero} from "../../model/hero";
import {HeroDAOService} from "../../service/dao/hero.dao.service";
import {ModelService} from "../../service/model.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isLoaded: boolean = false;

  constructor(private heroService: HeroDAOService, private modello: ModelService) {
  }

  get heroes(): Hero[] {
    let heroes: Hero[] = this.modello.getBean<Hero[]>(C.HEROES)!;
    if (heroes && heroes.length > 5) {
      heroes = heroes.slice(1, 5);
    }
    return heroes;
  }

  ngOnInit() {
    // NOTA: in questo modo la lista degli eroi non viene mai aggiornata
    // durante la sessione di lavoro; commentare il blocco per aggiornarla ad ogni richiesta
    // ---
    // let heroes_: Hero[] = this.modello.getTypedList(C.HEROES, Hero);
    // if (heroes_) {
    //   this.isLoaded = true;
    //   return;
    // }
    // ---
    this.isLoaded = false;
    this.heroService.getHeroes().subscribe(heroes => {
      this.modello.putBean(C.HEROES, heroes);
      this.isLoaded = true;
    });
  }
}
