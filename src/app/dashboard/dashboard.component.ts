import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { max } from 'rxjs/operators';

@Component({
  selector: 'nb-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private sources = [];
  private pageArray: Array<number>;

  constructor(private route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    const { sources } = this.route.snapshot.data;
    this.route.params.subscribe(params => {
      const index: number = +params['index'];
      const start: number = (index - 1) * 10;
      const numberOfPages: number = Math.floor(sources.sources.length / 10);
      const minPage: number = Math.max(1, start - 3);
      const maxPage: number = Math.min(numberOfPages, start + 3);
      this.pageArray = new Array(maxPage - minPage);
      this.pageArray.fill(0);
      this.sources = sources.sources.slice(start, index * 10);
      this.pageArray = this.pageArray.map((d, i) => minPage + i);
    });
  }
}
