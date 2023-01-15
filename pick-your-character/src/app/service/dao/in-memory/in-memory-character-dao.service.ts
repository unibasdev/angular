import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Character} from '../../../model/tasks/character';
import {ModelService} from '../../model.service';
import {InMemoryGenericDAOService} from './in-memory-generic-dao.service';

@Injectable({
  providedIn: 'root'
})
export class InMemoryCharacterDAOService extends InMemoryGenericDAOService<Character> {

  url = 'api/characters';  // URL to web api

  constructor(httpClient: HttpClient, model: ModelService) {
    super(httpClient, model);
  }
}
