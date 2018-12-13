import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[] = [], ...args: any): any {
    const [index, recordsPerPage] = args;
    const start: number = (index - 1) * recordsPerPage;
    return value.slice(start, index * recordsPerPage);
  }
}
