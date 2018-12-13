import { Component, OnDestroy, OnInit, AfterContentInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedApiService } from '../shared/services/feed-api.service';
import { combineLatest, Subject, Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { NewsBoard } from '../index';
import { __await } from 'tslib';
import { LocalizeRouterService } from 'localize-router';
import { el } from '@angular/platform-browser/testing/src/browser_util';

@Component({
  selector: 'nb-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnDestroy, AfterContentInit {

  private searchTerms: Subject<FormGroup> = new Subject<FormGroup>();
  private fdSub: Subscription;

  filterFeed: FormGroup;
  feeds: NewsBoard.SourceItemObject[];
  numberOfPages: number;
  currentPage: number;
  language: string;
  isComponentReady: boolean;
  recordsPerPage: number;
  toggleSubscribe: (source) => void;
  sourceContainerButtons;

  constructor(private route: ActivatedRoute,
              private feedApiService: FeedApiService,
              private translation: TranslateService,
              private router: Router,
              private localizeRouterService: LocalizeRouterService) {
    this.numberOfPages = 1;
    this.recordsPerPage = 2;
    this.language = this.translation.getBrowserLang();
    this.isComponentReady = false;
    this.toggleSubscribe = this.onSubscribeCb.bind(this);
  }

  onSubscribeCb(source) {
    if (this.feedApiService.isExists(source)) {
      this.feedApiService.removeFeed(source);
      source.isSubscribed = false;
      return;
    }
    this.feedApiService.addFeed(source);
    source.isSubscribed = true;
  }

  paginationRoute(index: number): string {
    return `/feed/${index}`;
  }

  onSearch(filtered: FormGroup) {
    this.isComponentReady = false;
    this.searchTerms.next(filtered);
  }

  // TODO + add pipe for filtering
  //      + fix issue with saving form state
  public ngOnInit() {
    this.sourceContainerButtons = [{
      classList(source: NewsBoard.SourceItemObject) {
        return source.isSubscribed ? ['fa-star'] : ['fa-star-o'];
      },
      toggle: (source: NewsBoard.SourceItemObject) => {
        if (this.feedApiService.isExists(source)) {
          source.isSubscribed = false;
          this.feedApiService.removeFeed(source);
        } else {
          source.isSubscribed = true;
          this.feedApiService.addFeed(source);
        }
        this.onSearch(this.filterFeed);
      }
    }];
    this.filterFeed = new FormGroup({
      language: new FormControl(this.language)
    });
    const params$ = this.route.params;
    const feeds$ = this.searchTerms.pipe(
      debounceTime(300),
      switchMap((form: FormGroup) => this.feedApiService.getFeeds(form.value))
    );
    combineLatest(
      params$, feeds$
    ).subscribe(async value => {
      const [params, feeds] = value;
      this.currentPage = +params['index'];
      this.numberOfPages = Math.max(Math.ceil(feeds.length / this.recordsPerPage), 1);
      this.feeds = feeds;
      if (this.currentPage > this.numberOfPages) {
        const routeName: string = this.paginationRoute(this.numberOfPages);
        const page = this.localizeRouterService.translateRoute(routeName);
        await this.router.navigate([page]);
      }
      this.isComponentReady = true;
    });
  }

  ngAfterContentInit(): void {
    this.onSearch(this.filterFeed);
  }

  public ngOnDestroy(): void {
    if (this.fdSub) {
      this.fdSub.unsubscribe();
    }
  }
}
