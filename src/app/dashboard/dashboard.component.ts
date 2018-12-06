import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'nb-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private sources = [];
  private pageArray: Array<number>;
  private currentPageNumber: number;

  constructor(private route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    const { sources } = this.route.snapshot.data;
    this.route.params.subscribe(params => {
      const numberOfPages: number = Math.floor(sources.sources.length / 10);

      const index: number = Math.min(+params['index'], numberOfPages);
      const start: number = (index - 1) * 10;

      const minPage: number = Math.max(1, index - 3);
      const maxPage: number = Math.min(numberOfPages, index + 3);
      const arrayLength: number = Math.max(5, maxPage - minPage);
      this.pageArray = new Array(arrayLength);
      this.pageArray.fill(0);
      this.sources = sources.sources.slice(start, index * 10);
      this.pageArray = this.pageArray.map((d, i) => minPage + i);
      this.currentPageNumber = index;
    });
  }
}
