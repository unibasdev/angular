import {Observable} from 'rxjs';

export class GenericDaoService<T> {

  getAll(): Observable<T[]> {
    throw new Error('Not implemented');
  }

  get(id: any): Observable<T | undefined> {
    throw new Error('Not implemented');
  }

  update(bean: T): void {
    throw new Error('Not implemented');
  }

  add(bean: T): void {
    throw new Error('Not implemented');
  }

  delete(id: any): void {
    throw new Error('Not implemented');
  }

  search(attributeName: string, value: any): Observable<T[]> {
    throw new Error('Not implemented');
  }

}
