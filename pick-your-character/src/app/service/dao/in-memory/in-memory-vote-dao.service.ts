import {Injectable} from '@angular/core';
import {ModelService} from '../../model.service';
import {HttpClient} from '@angular/common/http';
import {Vote} from '../../../model/tasks/vote';
import {InMemoryGenericDAOService} from './in-memory-generic-dao.service';

@Injectable({
  providedIn: 'root'
})
export class InMemoryVoteDAOService extends InMemoryGenericDAOService<Vote> {

  url = 'api/votes';  // URL to web api

  constructor(httpClient: HttpClient, model: ModelService) {
    super(httpClient, model);
  }
}
