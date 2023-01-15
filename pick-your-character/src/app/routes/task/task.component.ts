import {Component, OnInit} from '@angular/core';
import {ModelService} from '../../service/model.service';
import {Task} from '../../model/tasks/task';
import {Person} from '../../model/tasks/person';
import {Character} from '../../model/tasks/character';
import {InMemoryPersonDAOService} from '../../service/dao/in-memory/in-memory-person-dao.service';
import {InMemoryCharacterDAOService} from '../../service/dao/in-memory/in-memory-character-dao.service';
import {InMemoryVoteDAOService} from '../../service/dao/in-memory/in-memory-vote-dao.service';
import {Vote} from '../../model/tasks/vote';
import {User} from '../../model/user/user';
import {C} from '../../service/c';
import {TaskDaoService} from '../../service/dao/task-dao.service';
import {ActivatedRoute, Router} from "@angular/router";
import {DarkModeService} from "../../service/control/dark-mode.service";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  personForVote: Person | undefined;
  characterForVote: Character | undefined;

  constructor(
    private taskDao: TaskDaoService,
    private personDao: InMemoryPersonDAOService,
    private characterDao: InMemoryCharacterDAOService,
    private voteDao: InMemoryVoteDAOService,
    private model: ModelService,
    private route: ActivatedRoute,
    private router: Router,
    private darkModeService: DarkModeService
  ) {
  }

  get isDarkMode(): boolean {
    return this.darkModeService.isDarkMode;
  }

  get tasks(): Task[] {
    return this.model.getBean<Task[]>(C.TASKS)!;
  }

  get selectedTask(): Task | undefined {
    return this.model.getBean<Task>(C.SELECTED_TASK);
  }

  get taskPersons() {
    const selectedTask = this.selectedTask;
    if (!selectedTask) {
      return [];
    }
    return selectedTask.persons;
  }

  get taskCharacters() {
    const selectedTask = this.selectedTask;
    if (!selectedTask) {
      return [];
    }
    return selectedTask.characters;
  }

  get selectedPerson(): Person | undefined {
    return this.model.getBean<Person>(C.SELECTED_PERSON);
  }

  get selectedCharacter(): Character | undefined {
    return this.model.getBean<Character>(C.SELECTED_CHARACTER);
  }

  ngOnInit() {
    this.clearSelection();
    const tasksInModel = this.model.getBean<Task[]>(C.TASKS);
    if (!tasksInModel) {
      this.taskDao.getAll().subscribe(
        tasks => {
          this.model.putBean(C.TASKS, tasks);
          const selectedTask = this.model.getBean<Task>(C.SELECTED_TASK);
          if (!selectedTask && tasks && tasks.length > 0) {
            this.model.putBean(C.SELECTED_TASK, tasks[0]);
            this.router.navigate([tasks[0].id], {replaceUrl: true, relativeTo: this.route});
          }
        }
      );
    } else if (!('id' in this.route.snapshot.params)) {
      this.router.navigate([tasksInModel[0].id], {replaceUrl: true, relativeTo: this.route});
    }
  }

  selectTask(task: Task): void {
    this.model.putBean(C.SELECTED_TASK, task);
    this.fetchPersons();
    this.fetchCharacters();
    this.clearSelection();
  }

  clearSelection(): void {
    this.personForVote = undefined;
    this.characterForVote = undefined;
  }

  selectPerson(person: Person): void {
    this.model.putBean(C.SELECTED_PERSON, person);
  }

  selectCharacter(character: Character): void {
    this.model.putBean(C.SELECTED_CHARACTER, character);
  }

  saveVote(): void {
    const user = this.model.getBean<User>(C.USER)!;
    if (this.personForVote && this.characterForVote) {
      const vote: Vote = {
        id: undefined,
        personId: this.personForVote.id,
        person: this.personForVote,
        characterId: this.characterForVote.id,
        character: this.characterForVote,
        userId: user.id,
        user: user,
      };
      this.voteDao.add(vote).subscribe(_ => {
        this.model.saveMessage('Vote saved');
        this.clearSelection();
      });
    }
  }

  fetchPersons(): void {
    const selectedTask = (this.model.getBean(C.SELECTED_TASK) as Task);
    this.personDao.search('taskId', selectedTask.id).subscribe(
      persons => this.model.putBean(C.TASK_PERSONS, persons)
    );
  }

  fetchCharacters(): void {
    const selectedTask = (this.model.getBean(C.SELECTED_TASK) as Task);
    this.characterDao.search('taskId', selectedTask.id).subscribe(
      characters => this.model.putBean(C.TASK_CHARACTERS, characters)
    );
  }

  clearModalData() {
    this.model.removeBean(C.SELECTED_PERSON);
    this.model.removeBean(C.SELECTED_CHARACTER);
  }
}
