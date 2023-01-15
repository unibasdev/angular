import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {C} from "../../service/c";
import {Hero} from "../../model/hero";
import {ModelService} from "../../service/model.service";
import {HeroDAOService} from "../../service/dao/hero.dao.service";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  isLoaded: boolean = false;

  constructor(private modello: ModelService,
              private heroService: HeroDAOService,
              private route: ActivatedRoute,
              private location: Location) {
  }

  get hero(): Hero {
    return this.modello.getBean<Hero>(C.SELECTED_HERO)!;
  }

  ngOnInit() {
    //this.modello.putBean(SELECTED_HERO, new Hero());
    this.isLoaded = false;
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.heroService.getHero(id).subscribe(hero => {
      this.modello.putBean(C.SELECTED_HERO, hero);
      this.isLoaded = true;
    });
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
