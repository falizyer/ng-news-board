import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeedApiService } from '../shared/services/feed-api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'nb-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnDestroy {

  private feeds;
  private numberOfPages: number;
  private currentPage: number;
  private fdSub: Subscription;

  constructor(private route: ActivatedRoute,
              private feedApiService: FeedApiService) {

  }

  paginationRoute(index: number): string {
    return `/feed/${index}`;
  }

  // TODO add pipe for filtering
  public ngOnInit() {
    const recordsPerPage = 10;
    this.fdSub = this.feedApiService.getFeeds()
      .subscribe(feeds => {
        this.numberOfPages = Math.ceil(feeds.length / recordsPerPage);
        this.route.params.subscribe(params => {
          const index: number = +params['index'];
          const start: number = (index - 1) * recordsPerPage;
          this.currentPage = index;
          this.feeds = feeds.slice(start, index * recordsPerPage);
        });
      });
  }

  public ngOnDestroy(): void {
    if (this.fdSub) {
      this.fdSub.unsubscribe();
    }
  }
}
