import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { NewsBoard } from '../../index';

function* getFeeds(searchItem: NewsBoard.FeedSearchItemObject = {}) {
  let feedList = JSON.parse(window.localStorage.getItem('feeds')) || [];
  if (searchItem.language) {
    feedList = feedList.filter((feed: NewsBoard.SourceItemObject) => feed.language.startsWith(searchItem.language));
  }
  yield feedList || [];
}

@Injectable({
  providedIn: 'root'
})
export class FeedApiService {

  feeds: NewsBoard.SourceItemObject[];

  constructor() {
    this.feeds = getFeeds().next().value;
  }

  public isExists(source: NewsBoard.SourceItemObject): boolean {
    return !!this.feeds.find(d => d.id === source.id);
  }

  public removeFeed(source: NewsBoard.SourceItemObject): void {
    this.feeds = this.feeds.filter(d => d.id !== source.id);
    this.updateFeeds(this.feeds);
  }

  public addFeed(source: NewsBoard.SourceItemObject): void {
    this.feeds.push(source);
    this.updateFeeds(this.feeds);
  }

  public updateFeeds(feeds: Array<NewsBoard.SourceItemObject>): void {
    window.localStorage.setItem('feeds', JSON.stringify(feeds));
  }

  public getFeeds(searchItem?: NewsBoard.FeedSearchItemObject): Observable<any> {
    return from(getFeeds(searchItem));
  }
}
