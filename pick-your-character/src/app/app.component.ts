import {Component, Inject, OnInit} from '@angular/core';
import {ModelService} from './service/model.service';
import {DarkModeService} from "./service/control/dark-mode.service";
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'PyC';

  constructor(
    public model: ModelService,
    private darkModeService: DarkModeService,
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  ngOnInit() {
    let isDarkMode = this.darkModeService.isDarkMode;
    if (isDarkMode) {
      this.document.body.classList.add('text-bg-dark');
    }
    this.darkModeService.changeDarkMode.subscribe(_ => {
      if (this.darkModeService.isDarkMode) {
        this.document.body.classList.add('text-bg-dark');
      } else {
        this.document.body.classList.remove('text-bg-dark');
      }
    });
  }

}

