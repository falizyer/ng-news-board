import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap, map, take
} from 'rxjs/operators';
import { NewsBoard } from '../../index';
import { NewsApiRepositoryService } from '../services/news-api-repository.service';

@Component({
  selector: 'nb-source-search',
  templateUrl: './source-search.component.html',
  styleUrls: ['./source-search.component.scss']
})
export class SourceSearchComponent implements OnInit {

  private sources$: Observable<NewsBoard.SourceItemObject>;
  private searchTerms: Subject<string> = new Subject<string>();

  constructor(private newsApiRepository: NewsApiRepositoryService) {

  }

  search(name: string) {
    this.searchTerms.next(name);
  }

  ngOnInit() {
    this.sources$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((language: string) => this.newsApiRepository.getSources({language})),
      map(value => value.sources)
    );
  }

}
