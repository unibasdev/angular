import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ModelService} from '../../model.service';
import {Observable, of} from 'rxjs';
import {User} from '../../../model/user/user';
import {catchError, map, tap} from 'rxjs/operators';
import * as sha from 'js-sha256';
import {InMemoryGenericDAOService} from './in-memory-generic-dao.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class InMemoryUserDAOService extends InMemoryGenericDAOService<User> {

  url = 'api/users';  // URL to web api

  constructor(httpClient: HttpClient, model: ModelService) {
    super(httpClient, model);
  }

  searchUser(userName: string, password: string): Observable<User[]> {
    if (!userName.trim()) {
      return of([]);
    }
    // VERSIONE MOCK
    return this.getAll().pipe(
      map(users => users.filter(user =>
        user.userName === userName && user.passwordHash === sha.sha256(password))),
      tap(_ => this.log(`Search beans matching ${userName} from ${this.url}`)),
      catchError(this.handleError<User[]>('Search', []))
    );
    // const userNamePattern = '^' + escapeRegExp(userName) + '$';
    // const options = userName ? { params: new HttpParams().set('userName', userNamePattern) } : {};
    // return this.httpClient.get<User[]>(this.url, options).pipe(
    //   map(users => users.filter(user =>
    //     user.passwordHash === sha.sha256(password))),
    //   tap(_ => this.log(`Search beans matching ${userName} from ${this.url}`)),
    //   catchError(this.handleError<User[]>('Search', []))
    // );
  }

  private escapeRegExp(value: string) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }

}
