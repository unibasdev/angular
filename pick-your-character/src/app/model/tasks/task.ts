import {Character} from './character';
import {Person} from './person';

export interface Task {
  id: number;
  name: string;
  persons: Person[];
  characters: Character[];
}
