import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'nb-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  private feeds;
  private numberOfPages: number;
  private currentPage: number;

  constructor(private route: ActivatedRoute) {

  }

  paginationRoute(index: number): string {
    return `/feed/${index}`;
  }

  // TODO add pipe for filtering
  public ngOnInit() {
    const { feeds = [] } = this.route.snapshot.data;
    const recordsPerPage = 10;
    this.numberOfPages = Math.ceil(feeds.length / recordsPerPage);
    this.route.params.subscribe(params => {
      const index: number = +params['index'];
      const start: number = (index - 1) * recordsPerPage;
      this.currentPage = index;
      this.feeds = feeds.slice(start, index * recordsPerPage);
    });
  }
}
