import { Component, OnDestroy, OnInit, AfterContentInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeedApiService } from '../shared/services/feed-api.service';
import { Subject, Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'nb-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnDestroy, AfterContentInit {

  private searchTerms: Subject<FormGroup> = new Subject<FormGroup>();

  private fdSub: Subscription;

  filterFeed: FormGroup;
  feeds$;
  numberOfPages: number;
  currentPage: number;
  language: string;
  isComponentReady: boolean;

  constructor(private route: ActivatedRoute,
              private feedApiService: FeedApiService,
              private translation: TranslateService) {
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
    this.route.params.subscribe(params => {
      this.currentPage = +params['index'];
      this.feeds$ = this.searchTerms.pipe(
        debounceTime(300),
        switchMap((form: FormGroup) => {
          return this.feedApiService.getFeeds(form.value);
        }),
        map(value => {
          this.numberOfPages = Math.ceil(value.length / recordsPerPage);
          const start: number = (this.currentPage - 1) * recordsPerPage;
          this.isComponentReady = true;
          return value.slice(start, this.currentPage * recordsPerPage);
        })
      );
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
