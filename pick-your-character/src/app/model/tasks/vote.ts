import {Person} from './person';
import {Character} from './character';
import {User} from '../user/user';

export interface Vote {
  readonly id: number | undefined;
  readonly personId: number;
  readonly person: Person;
  readonly characterId: number;
  readonly character: Character;
  readonly userId: number;
  readonly user: User;
}
