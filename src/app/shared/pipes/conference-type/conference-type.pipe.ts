import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'conferencetype'
})
export class ConferenceTypePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return value == 'East' ? 'Eastern' : 'Western';
  }

}
