import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'minutes'
})
export class MinutesPipe implements PipeTransform {
  transform(nanoSeconds: number): string {
    const minutes = Math.floor(nanoSeconds / 1000000000 / 60);
    const seconds = Math.floor(nanoSeconds / 1000000000 % 60);
    return `${minutes > 9 ? '' : '0'}${minutes}:${seconds > 9 ? '' : '0'}${seconds}`;
  }
}
