import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsBoard } from '../index';
import { FeedApiService } from '../shared/services/feed-api.service';
import { NewsApiRepositoryService } from '../shared/services/news-api-repository.service';
import { Subscription } from 'rxjs';

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

  constructor(private route: ActivatedRoute,
              private newsApiRepositoryService: NewsApiRepositoryService,
              private feedApiService: FeedApiService) {
    this.numberOfPages = 0;
    this.currentPage = 1;
    this.onSubscribeFn = this.onSubscribe.bind(this);
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
    const recordsPerPage = 12;
    this.narSub = this.newsApiRepositoryService.getSources()
      .subscribe(sources => {
        this.numberOfPages = Math.ceil(sources.sources.length / recordsPerPage);
        this.route.params.subscribe(params => {
          const index: number = +params['index'];
          const start: number = (index - 1) * recordsPerPage;
          this.currentPage = index;
          this.sources = sources.sources.slice(start, index * recordsPerPage);
        });
      });
  }

  public ngOnDestroy(): void {
    if (this.narSub) {
      this.narSub.unsubscribe();
    }
  }
}
