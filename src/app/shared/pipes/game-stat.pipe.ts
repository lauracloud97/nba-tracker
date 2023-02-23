import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gameStat'
})
export class GameStatPipe implements PipeTransform {

  transform(value: boolean): string {
    return value ? 'W' : 'L'
  }

}
