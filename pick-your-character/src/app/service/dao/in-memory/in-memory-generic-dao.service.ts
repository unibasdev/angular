import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ModelService} from '../../model.service';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {GenericDaoService} from '../generic-dao.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export abstract class InMemoryGenericDAOService<T> extends GenericDaoService<T> {

  abstract url: string;  // URL to web api

  constructor(protected httpClient: HttpClient, protected model: ModelService) {
    super();
  }

  override getAll(): Observable<T[]> {
    return this.httpClient.get<T[]>(this.url)
      .pipe(
        tap(_ => this.log('Get beans from ' + this.url)),
        catchError(this.handleError<T[]>('Get ', []))
      );
  }

  override get(id: number): Observable<T> {
    const urlWithId = `${this.url}/${id}`;
    return this.httpClient.get<T>(urlWithId).pipe(
      tap(_ => this.log(`Get bean with id=${id} from ${urlWithId}`)),
      catchError(this.handleError<T>(`Get id=${id}`))
    );
  }

  /** GET bean by id. Return `undefined` when id not found */
  getNo404<Data>(id: number): Observable<T> {
    const url = `${this.url}/?id=${id}`;
    return this.httpClient.get<T[]>(url)
      .pipe(
        map(beans => beans[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `Get ` : `Did not find`;
          this.log(`${outcome} bean with id=${id} from ${this.url}`);
        }),
        catchError(this.handleError<T>(`Get id=${id}`))
      );
  }

  override update(bean: T): Observable<any> {
    return this.httpClient.put(this.url, bean, httpOptions).pipe(
      tap(_ => this.log(`Updated bean ${bean} from ${this.url}`)),
      catchError(this.handleError<any>('Update'))
    );
  }

  override add(bean: T): Observable<T> {
    return this.httpClient.post<T>(this.url, bean, httpOptions).pipe(
      tap((newBean: T) => this.log(`Added bean ${newBean} from ${this.url}`)),
      catchError(this.handleError<T>('Add'))
    );
  }

  override delete(id: number): Observable<T> {
    const url = `${this.url}/${id}`;
    return this.httpClient.delete<T>(url, httpOptions).pipe(
      tap(_ => this.log(`Deleted bean with id=${id} from ${this.url}`)),
      catchError(this.handleError<T>('Delete'))
    );
  }

  override search(attributeName: string, value: number): Observable<T[]> {
    const pattern = '^' + value + '$';
    const options = {params: new HttpParams().set(attributeName, pattern)};
    return this.httpClient.get<T[]>(this.url, options).pipe(
      tap(_ => this.log(`Search beans for attribute ${attributeName}=${value} from ${this.url}`)),
      catchError(this.handleError<T[]>('Search', []))
    );
  }

  protected log(message: string) {
    console.log(message);
  }

  protected handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
