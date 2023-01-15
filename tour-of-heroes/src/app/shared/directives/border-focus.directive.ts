import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appBorderFocus]'
})
export class BorderFocusDirective {

  constructor() { }

  @HostListener('focus', ['$event.target'])
  onFocus(target: Element) {
    if (!target.classList.contains('input--focus')) {
      target.classList.add('input--focus');
    }
  }

  @HostListener('blur', ['$event.target'])
  onBlur(target: Element) {
    if (target.classList.contains('input--focus')) {
      target.classList.remove('input--focus');
    }
  }

}
