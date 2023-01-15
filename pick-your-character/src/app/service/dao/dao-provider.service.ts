import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {C} from '../c';
import {InMemoryUserDAOService} from './in-memory/in-memory-user-dao.service';
import {UserDaoService} from './user-dao.service';

@Injectable({
  providedIn: 'root'
})
export class DAOProviderService {

  constructor(
    private inMemoryUserDao: InMemoryUserDAOService,
  ) {
  }


  getUserDao(): UserDaoService {
    if (environment.daoStrategy === C.IN_MEMORY_DAO) {
      return this.inMemoryUserDao;
    }
    throw new Error("Strategia DAO non supportata")
  }
}
