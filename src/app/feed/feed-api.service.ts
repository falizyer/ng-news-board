import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { from, Observable } from 'rxjs';
import { NewsBoard } from '../index';

function* getFeeds() {
  yield JSON.parse(window.localStorage.getItem('feeds'));
}

@Injectable({
  providedIn: 'root'
})
export class FeedApiService implements Resolve<any> {

  constructor() { }

  public updateFeeds(feeds: Array<NewsBoard.SourceItemObject>) {
    window.localStorage.setItem('feeds', JSON.stringify(feeds));
  }

  public resolve(): Observable<any> {
    return from(getFeeds());
  }
}
