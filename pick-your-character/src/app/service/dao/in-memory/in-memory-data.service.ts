import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Character} from 'src/app/model/tasks/character';
import {Person} from 'src/app/model/tasks/person';
import {Task} from 'src/app/model/tasks/task';
import {Vote} from 'src/app/model/tasks/vote';
import {User} from '../../../model/user/user';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    // password: 'password'
    const users: User[] = [
      {
        id: 11, userName: 'user1@user.it', firstName: 'John', lastName: 'Smith',
        passwordHash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', token: 'fake-token'
      },
      {
        id: 12, userName: 'user2@user.it', firstName: 'Frank', lastName: 'Castle',
        passwordHash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', token: 'fake-token'
      },
    ];
    // Persons in task 11
    const personsInTask11: Person[] = [
      {id: 11, name: 'Mario Rossi', taskId: 11, votes: []},
      {id: 12, name: 'Luigi Bianchi', taskId: 11, votes: []},
    ];
    // Persons in task 12
    const personsInTask12: Person[] = [
      {id: 13, name: 'Mario Rossi', taskId: 12, votes: []},
      {id: 14, name: 'Luigi Bianchi', taskId: 12, votes: []},
    ];
    // Characters in task 11
    const charactersInTask11: Character[] = [
      {id: 11, name: 'Richard Hendricks', description: 'Silicon Valley', image: '', taskId: 11, votes: []},
      {id: 12, name: 'Erlich Bachman', description: 'Silicon Valley', image: '', taskId: 11, votes: []},
      {id: 13, name: 'Jared Dunn', description: 'Silicon Valley', image: '', taskId: 11, votes: []},
      {id: 14, name: 'Bertram Gilfoyle', description: 'Silicon Valley', image: '', taskId: 11, votes: []},
      {id: 15, name: 'Dinesh Chugtai', description: 'Silicon Valley', image: '', taskId: 11, votes: []},
    ];
    // Characters in task 12
    const charactersInTask12: Character[] = [
      {id: 16, name: 'Ed Stark', description: 'Game of Thrones', image: '', taskId: 12, votes: []},
      {id: 17, name: 'Catlyn Stark', description: 'Game of Thrones', image: '', taskId: 12, votes: []},
      {id: 18, name: 'Jon Snow', description: 'Game of Thrones', image: '', taskId: 12, votes: []},
      {id: 19, name: 'Arya Stark', description: 'Game of Thrones', image: '', taskId: 12, votes: []},
    ];
    const tasks: Task[] = [
      {id: 11, name: 'Silicon Valley', persons: personsInTask11, characters: charactersInTask11},
      {id: 12, name: 'Game of Thrones', persons: personsInTask12, characters: charactersInTask12},
    ];
    const persons = [
      ...personsInTask11,
      ...personsInTask12
    ];
    const characters = [
      ...charactersInTask11,
      ...charactersInTask12
    ];
    const votes: Vote[] = [];
    return {users, tasks, persons, characters, votes};
  }

  genId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 11;
  }
}
