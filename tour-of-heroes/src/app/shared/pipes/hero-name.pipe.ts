import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'heroName'
})
export class HeroNamePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): string {
    return `Details of ${value}`;
  }

}
