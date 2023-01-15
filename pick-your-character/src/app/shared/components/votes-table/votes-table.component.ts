import {Component, Input, OnInit} from '@angular/core';
import {Vote} from "../../../model/tasks/vote";
import {DarkModeService} from "../../../service/control/dark-mode.service";

@Component({
  selector: 'app-votes-table',
  templateUrl: './votes-table.component.html',
  styleUrls: ['./votes-table.component.css']
})
export class VotesTableComponent implements OnInit {
  @Input() votes!: Vote[];
  @Input() entityName!: string;

  constructor(private darkModeService: DarkModeService) { }

  get isDarkMode(): boolean {
    return this.darkModeService.isDarkMode;
  }

  ngOnInit(): void {
  }

}
