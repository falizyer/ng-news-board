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

  constructor(private route: ActivatedRoute,
              private feedApiService: FeedApiService,
              private translation: TranslateService,
              private router: Router,
              private localizeRouterService: LocalizeRouterService) {
    this.numberOfPages = 0;
    this.language = this.translation.getBrowserLang();
    this.isComponentReady = false;
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
    const recordsPerPage = 2;
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
      this.numberOfPages = Math.ceil(feeds.length / recordsPerPage);
      const start: number = (this.currentPage - 1) * recordsPerPage;
      this.feeds = feeds.slice(start, this.currentPage * recordsPerPage);
      this.isComponentReady = true;
      if (this.currentPage > this.numberOfPages) {
        const routeName: string = this.paginationRoute(this.numberOfPages);
        const page = this.localizeRouterService.translateRoute(routeName);
        await this.router.navigate([page]);
      }
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
