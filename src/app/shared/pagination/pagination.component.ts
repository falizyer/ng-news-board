import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'nb-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {

  @Input() public shift: number;
  @Input() public length: number;
  @Input() public current: number;
  @Input() public routeLink: (index: number) => string;

  private listOfIndexes: Array<number>;

  constructor() {
    this.shift = 4;
    this.length = 0;
    this.current = 0;
  }

  public getListOfIndexes(): Array<number> {
    const minIndex: number = Math.max(1, this.current - this.shift);
    const maxIndex: number = Math.min(this.length, this.current + this.shift);
    const arrayLength: number = (maxIndex - minIndex + 1) || 0;
    const list = new Array<number>(arrayLength);
    list.fill(0);
    return list.map((d, i) => minIndex + i);
  }

  public ngOnChanges(changes) {
    this.listOfIndexes = this.getListOfIndexes();
  }

}
