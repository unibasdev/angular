import {Injectable} from '@angular/core';
import {C} from './c';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  private _beans: Map<C, any> = new Map<C, any>();

  constructor() {
  }

  private _loading = false;

  get loading(): boolean {
    return this._loading;
  }

  set loading(value: boolean) {
    setTimeout(() => this._loading = value, 0);
  }

  getBean<T>(key: C): T | undefined {
    return this._beans.get(key);
  }

  putBean<T>(key: C, bean: T | undefined): void {
    this._beans.set(key, bean);
  }

  removeBean(key: C): void {
    this._beans.delete(key);
  }

}
