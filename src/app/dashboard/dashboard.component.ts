import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsBoard } from '../index';
import { FeedApiService } from '../shared/services/feed-api.service';
import { NewsApiRepositoryService } from '../shared/services/news-api-repository.service';
import { Subscription, combineLatest } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'nb-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  sources: NewsBoard.SourceItemObject[] = [];
  currentPage: number;
  private onSubscribeFn: (source: NewsBoard.SourceItemObject) => void;
  private narSub: Subscription;
  recordsPerPage: number;
  paginationLength: number;
  isComponentReady: boolean;

  constructor(private route: ActivatedRoute,
              private newsApiRepositoryService: NewsApiRepositoryService,
              private feedApiService: FeedApiService) {
    this.currentPage = 1;
    this.onSubscribeFn = this.onSubscribe.bind(this);
    this.recordsPerPage = 12;
    this.paginationLength = 0;
    this.isComponentReady = false;
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
      this.isComponentReady = true;
    });
  }

  public ngOnDestroy(): void {
    if (this.narSub) {
      this.narSub.unsubscribe();
    }
  }
}
