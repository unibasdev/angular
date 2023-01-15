import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  isDarkMode = false;
  private _changeDarkMode = new Subject<boolean>();

  get changeDarkMode(): Observable<boolean> {
    return this._changeDarkMode;
  }

  constructor() {
    const darkMode = localStorage.getItem('darkMode');
    if (!!darkMode && darkMode === 'true') {
      this.isDarkMode = true;
    }
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', `${this.isDarkMode}`);
    this._changeDarkMode.next(this.isDarkMode);
  }
}
