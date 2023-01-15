import {Vote} from './vote';

export interface Person {
  id: number;
  name: string;
  taskId: number;
  votes: Vote[];
}
