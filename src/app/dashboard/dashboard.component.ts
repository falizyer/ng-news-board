import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsBoard } from '../index';
import { FeedApiService } from '../shared/services/feed-api.service';
import { NewsApiRepositoryService } from '../shared/services/news-api-repository.service';
import { Subscription, combineLatest } from 'rxjs';
import { SCButtonsTypeObject } from '../shared/source-container/source-container.component';

@Component({
  selector: 'nb-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  private onSubscribeFn: (source: NewsBoard.SourceItemObject) => void;
  private narSub: Subscription;
  sources: NewsBoard.SourceItemObject[] = [];
  currentPage: number;
  recordsPerPage: number;
  paginationLength: number;
  isComponentReady: boolean;
  sourceContainerButtons: SCButtonsTypeObject[];

  constructor(private route: ActivatedRoute,
              private newsApiRepositoryService: NewsApiRepositoryService,
              private feedApiService: FeedApiService) {
    this.currentPage = 1;
    this.onSubscribeFn = this.onSubscribe.bind(this);
    this.recordsPerPage = 12;
    this.paginationLength = 0;
    this.isComponentReady = false;
  }

  private onSubscribe(source: NewsBoard.SourceItemObject): void {
    if (this.feedApiService.isExists(source)) {
      this.feedApiService.removeFeed(source);
      source.isSubscribed = false;
      return;
    }
    this.feedApiService.addFeed(source);
    source.isSubscribed = true;
  }

  paginationRoute(index: number): string {
    return `/dashboard/${index}`;
  }

  isSubscribed(source): boolean {
    return this.feedApiService.isExists(source);
  }

  public ngOnInit(): void {
    this.sourceContainerButtons = [{
      classList(source: NewsBoard.SourceItemObject) {
        return source.isSubscribed ? ['fa-star'] : ['fa-star-o'];
      },
      toggle: (source: NewsBoard.SourceItemObject) => {
        if (this.feedApiService.isExists(source)) {
          source.isSubscribed = false;
          this.feedApiService.removeFeed(source);
          return;
        }
        source.isSubscribed = true;
        this.feedApiService.addFeed(source);
      }
    }];
    const routeParams$ = this.route.params;
    const sources$ = this.newsApiRepositoryService.getSources();
    combineLatest(
      routeParams$,
      sources$
    ).subscribe(value => {
      const [params, sources] = value;
      this.currentPage = +params['index'];
      this.sources = sources.sources.map((datum: NewsBoard.SourceItemObject) => {
        datum.isSubscribed = this.feedApiService.isExists(datum);
        return datum;
      });
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
