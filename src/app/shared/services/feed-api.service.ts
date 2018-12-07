import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { from, Observable } from 'rxjs';
import { NewsBoard } from '../../index';

function* getFeeds() {
  yield JSON.parse(window.localStorage.getItem('feeds')) || [];
}

@Injectable({
  providedIn: 'root'
})
export class FeedApiService implements Resolve<any> {

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

  public resolve(): Observable<any> {
    return from(getFeeds());
  }
}
