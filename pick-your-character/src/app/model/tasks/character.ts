import {Vote} from './vote';

export interface Character {
  id: number;
  name: string;
  description: string;
  image: string;
  taskId: number;
  votes: Vote[];
}
