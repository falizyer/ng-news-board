import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsBoard } from '../index';
import { FeedApiService } from '../shared/services/feed-api.service';

@Component({
  selector: 'nb-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private sources: NewsBoard.SourceItemObject[] = [];
  private numberOfPages: number;
  private currentPage: number;

  constructor(private route: ActivatedRoute,
              private feedApiService: FeedApiService) {
    this.numberOfPages = 0;
    this.currentPage = 1;
  }

  paginationRoute(index: number): string {
    return `/dashboard/${index}`;
  }

  onSubscribe(source: NewsBoard.SourceItemObject): void {
    if (this.feedApiService.isExists(source)) {
      this.feedApiService.removeFeed(source);
      return;
    }
    this.feedApiService.addFeed(source);
  }

  // TODO add pipe for filtering
  public ngOnInit(): void {
    const { sources } = this.route.snapshot.data;
    const recordsPerPage = 10;
    this.numberOfPages = Math.ceil(sources.sources.length / recordsPerPage);
    this.route.params.subscribe(params => {
      const index: number = +params['index'];
      const start: number = (index - 1) * recordsPerPage;
      this.currentPage = index;
      this.sources = sources.sources.slice(start, index * recordsPerPage);
    });
  }
}
