import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsBoard } from '../index';
import { FeedApiService } from '../shared/services/feed-api.service';
import { NewsApiRepositoryService } from '../shared/services/news-api-repository.service';
import { Subscription, combineLatest } from 'rxjs';

@Component({
  selector: 'nb-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  private sources: NewsBoard.SourceItemObject[] = [];
  private currentPage: number;
  private onSubscribeFn: (source: NewsBoard.SourceItemObject) => void;
  private narSub: Subscription;
  recordsPerPage: number;
  paginationLength: number;

  constructor(private route: ActivatedRoute,
              private newsApiRepositoryService: NewsApiRepositoryService,
              private feedApiService: FeedApiService) {
    this.currentPage = 1;
    this.onSubscribeFn = this.onSubscribe.bind(this);
    this.recordsPerPage = 12;
    this.paginationLength = 0;
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

  public ngOnInit(): void {
    const routeParams$ = this.route.params;
    const sources$ = this.newsApiRepositoryService.getSources();
    combineLatest(
      routeParams$,
      sources$
    ).subscribe(value => {
      const [params, sources] = value;
      this.currentPage = +params['index'];
      this.sources = sources.sources;
      this.paginationLength = Math.ceil(this.sources.length / this.recordsPerPage);
    });
  }

  public ngOnDestroy(): void {
    if (this.narSub) {
      this.narSub.unsubscribe();
    }
  }
}
