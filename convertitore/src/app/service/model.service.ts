import {Injectable} from '@angular/core';
import {Convertitore} from '../model/convertitore';
import {C} from './c';

@Injectable({
  providedIn: 'root'
})
export class ModelloService {

  private beans: Map<C, any> = new Map<C, any>();

  constructor() {
    let convertitore : Convertitore = new Convertitore();
    this.putBean(C.CONVERTITORE, convertitore);
  }

  getBean<T>(key: C): T | undefined {
    return this.beans.get(key);
  }

  putBean<T>(key: C, bean: T | undefined): void {
    this.beans.set(key, bean);
  }

  removeBean(key: C): void {
    this.beans.delete(key);
  }

}
