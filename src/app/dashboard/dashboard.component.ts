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
  private numberOfPages: number;
  private currentPage: number;
  private onSubscribeFn: (source: NewsBoard.SourceItemObject) => void;
  private narSub: Subscription;
  recordsPerPage: number;

  constructor(private route: ActivatedRoute,
              private newsApiRepositoryService: NewsApiRepositoryService,
              private feedApiService: FeedApiService) {
    this.numberOfPages = 0;
    this.currentPage = 1;
    this.onSubscribeFn = this.onSubscribe.bind(this);
    this.recordsPerPage = 12;
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
      this.numberOfPages = sources.sources.length;
      this.sources = sources.sources;
    });
  }

  public ngOnDestroy(): void {
    if (this.narSub) {
      this.narSub.unsubscribe();
    }
  }
}
