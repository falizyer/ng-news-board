import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { from, Observable } from 'rxjs';
import { NewsBoard } from '../index';

function* getFeeds() {
  yield JSON.parse(window.localStorage.getItem('feeds')) || [];
}

@Injectable({
  providedIn: 'root'
})
export class FeedApiService implements Resolve<any> {

  constructor() {
  }

  public isExists(source: NewsBoard.SourceItemObject): boolean {
    const feeds: NewsBoard.SourceItemObject[] = getFeeds().next().value;
    return !!feeds.find(d => d.id === source.id);
  }

  public removeFeed(source: NewsBoard.SourceItemObject): void {
    const feeds: NewsBoard.SourceItemObject[] = getFeeds().next().value;
    this.updateFeeds(feeds.filter(d => d.id !== source.id));
  }

  public addFeed(source: NewsBoard.SourceItemObject): void {
    const feeds: NewsBoard.SourceItemObject[] = getFeeds().next().value;
    this.updateFeeds([...feeds, source]);
  }

  public updateFeeds(feeds: Array<NewsBoard.SourceItemObject>): void {
    window.localStorage.setItem('feeds', JSON.stringify(feeds));
  }

  public resolve(): Observable<any> {
    return from(getFeeds());
  }
}
