import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ModelService} from '../../../service/model.service';
import {InMemoryPersonDAOService} from '../../../service/dao/in-memory/in-memory-person-dao.service';
import {Person} from '../../../model/tasks/person';
import {InMemoryVoteDAOService} from '../../../service/dao/in-memory/in-memory-vote-dao.service';
import {ActivatedRoute} from '@angular/router';
import {InMemoryTaskDAOService} from '../../../service/dao/in-memory/in-memory-task-dao.service';
import {C} from '../../../service/c';
import {Vote} from "../../../model/tasks/vote";
import {Task} from "../../../model/tasks/task";
import {DarkModeService} from "../../../service/control/dark-mode.service";

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  @Output() close = new EventEmitter<void>();

  constructor(
    private route: ActivatedRoute,
    private taskDao: InMemoryTaskDAOService,
    private personDao: InMemoryPersonDAOService,
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

  get selectedPerson(): Person | undefined {
    return this.model.getBean<Person>(C.SELECTED_PERSON);
  }

  get votes(): Vote[] {
    const selectedPerson = this.selectedPerson;
    if (!selectedPerson) {
      return [];
    }
    return (selectedPerson as Person).votes;
  }

  ngOnInit() {
    this.fetchVotes();
  }

  fetchVotes(): void {
    const selectedPerson = this.model.getBean<Person>(C.SELECTED_PERSON);
    if (selectedPerson) {
      this.voteDao.search('personId', selectedPerson.id).subscribe(
        votes => selectedPerson.votes = votes
      );
    }
  }
}
