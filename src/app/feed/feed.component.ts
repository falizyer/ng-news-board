import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeedApiService } from '../shared/services/feed-api.service';
import { Subject, Subscription } from 'rxjs';
import { NewsBoard } from '../index';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, first, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'nb-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnDestroy {

  private searchTerms: Subject<FormGroup> = new Subject<FormGroup>();

  private filterFeed: FormGroup;
  private feeds$;
  private numberOfPages: number;
  private currentPage: number;
  private fdSub: Subscription;

  constructor(private route: ActivatedRoute,
              private feedApiService: FeedApiService) {

  }

  paginationRoute(index: number): string {
    return `/feed/${index}`;
  }

  onSearch(filtered: FormGroup) {
    this.searchTerms.next(filtered);
    // this.feeds$.subscribe(feeds => {
    //   const recordsPerPage = 3;
    //   this.numberOfPages = Math.ceil(feeds.length / recordsPerPage);
    //   const start: number = (this.currentPage - 1) * recordsPerPage;
    // });
  }

  // TODO add pipe for filtering
  public ngOnInit() {
    const recordsPerPage = 12;
    this.route.params.subscribe(params => {
      this.feeds$ = this.searchTerms.pipe(
        debounceTime(300),
        switchMap((form: FormGroup) => {
          return this.feedApiService.getFeeds(form.value);
        })
      );
      this.currentPage = +params['index'];
      this.numberOfPages = 1;
      this.filterFeed = new FormGroup({
        language: new FormControl('')
      });
      this.onSearch(this.filterFeed);
      // this.fdSub = this.feeds$
      //   .subscribe(feeds => {
      //     this.numberOfPages = Math.ceil(feeds.length / recordsPerPage);
      //     const start: number = (this.currentPage - 1) * recordsPerPage;
      //     this.feeds = feeds.slice(start, this.numberOfPages);
      //   });
    });



  }

  public ngOnDestroy(): void {
    if (this.fdSub) {
      this.fdSub.unsubscribe();
    }
  }
}
