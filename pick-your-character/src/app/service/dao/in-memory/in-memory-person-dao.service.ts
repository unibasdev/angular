import {Injectable} from '@angular/core';
import {ModelService} from '../../model.service';
import {HttpClient} from '@angular/common/http';
import {Person} from '../../../model/tasks/person';
import {InMemoryGenericDAOService} from './in-memory-generic-dao.service';

@Injectable({
  providedIn: 'root'
})
export class InMemoryPersonDAOService extends InMemoryGenericDAOService<Person> {

  url = 'api/persons';  // URL to web api

  constructor(httpClient: HttpClient, model: ModelService) {
    super(httpClient, model);
  }

}
