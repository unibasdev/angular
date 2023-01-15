import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ModelService} from "../../../service/model.service";
import {Task} from "../../../model/tasks/task";
import {C} from "../../../service/c";
import {Vote} from "../../../model/tasks/vote";
import {Character} from "../../../model/tasks/character";
import {InMemoryVoteDAOService} from "../../../service/dao/in-memory/in-memory-vote-dao.service";
import {DarkModeService} from "../../../service/control/dark-mode.service";

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {
  @Output() close = new EventEmitter<void>();

  constructor(
    private voteDao: InMemoryVoteDAOService,
    private model: ModelService,
    private darkModeService: DarkModeService
  ) {
  }

  get isDarkMode(): boolean {
    return this.darkModeService.isDarkMode;
  }

  get selectedTask(): Task | undefined {
    return this.model.getBean<Task>(C.SELECTED_TASK)!;
  }

  get selectedCharacter(): Character | undefined {
    return this.model.getBean<Character>(C.SELECTED_CHARACTER);
  }

  get votes(): Vote[] {
    if (!this.selectedCharacter) {
      return [];
    }
    return this.selectedCharacter.votes;
  }

  ngOnInit() {
    this.fetchVotes();
  }

  fetchVotes(): void {
    const selectedCharacter = this.selectedCharacter;
    if (selectedCharacter) {
      console.log('c.id', selectedCharacter.id)
      this.voteDao.search('characterId', selectedCharacter.id).subscribe(
        votes => selectedCharacter.votes = votes
      );
    }
  }

}
