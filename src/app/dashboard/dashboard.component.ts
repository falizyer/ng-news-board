import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'nb-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private sources = [];
  private numberOfPages: number;
  private currentPage: number;

  constructor(private route: ActivatedRoute) {
    this.numberOfPages = 0;
    this.currentPage = 1;
  }

  paginationRoute(index: number): string {
    return `/dashboard/${index}`;
  }

  public ngOnInit(): void {
    const { sources } = this.route.snapshot.data;
    this.numberOfPages = Math.ceil(sources.sources.length / 10);
    this.route.params.subscribe(params => {
      const index: number = +params['index'];
      const start: number = (index - 1) * 10;
      this.currentPage = index;
      this.sources = sources.sources.slice(start, index * 10);
    });
  }
}
