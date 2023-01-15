import {Observable} from 'rxjs';
import {User} from '../../model/user/user';
import {GenericDaoService} from './generic-dao.service';

export class UserDaoService extends GenericDaoService<User> {
  searchUser(userName: string, password: string): Observable<User[]> {
    throw new Error('Not implemented');
  }
}
