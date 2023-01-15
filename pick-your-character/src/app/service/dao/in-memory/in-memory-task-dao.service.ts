import {Injectable} from '@angular/core';
import {ModelService} from '../../model.service';
import {Task} from '../../../model/tasks/task';
import {HttpClient} from '@angular/common/http';
import {InMemoryGenericDAOService} from './in-memory-generic-dao.service';

@Injectable({
  providedIn: 'root'
})
export class InMemoryTaskDAOService extends InMemoryGenericDAOService<Task> {

  url = 'api/tasks';  // URL to web api

  constructor(httpClient: HttpClient, model: ModelService) {
    super(httpClient, model);
  }

}
