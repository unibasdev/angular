import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ModelService} from '../../../service/model.service';
import {C} from '../../../service/c';
import {DarkModeService} from "../../../service/control/dark-mode.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private model: ModelService,
    private darkModeService: DarkModeService
  ) {
  }

  get isDarkMode(): boolean {
    return this.darkModeService.isDarkMode;
  }

  get user() {
    return this.model.getBean(C.USER);
  }

  ngOnInit() {
  }

  logout() {
    this.model.removeBean(C.USER);
    this.router.navigate(['/login']);
  }

  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }
}
