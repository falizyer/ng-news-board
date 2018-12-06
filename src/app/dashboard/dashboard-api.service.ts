import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NewsBoard } from '../index';

@Injectable({
  providedIn: 'root'
})
export class DashboardApiService implements Resolve<NewsBoard.ArticleResponseObject> {

  private apiKey: string;
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiKey = 'b692d5f34dda413cab3001f0ee499f80';
    this.apiUrl = 'https://newsapi.org/v2/';
  }

  public getSources(): Observable<any> {
    const url = `${this.apiUrl}/sources?apiKey=${this.apiKey}`;
    return this.http.get(url);
  }

  public getArticleFromSource(source: string ) {
    this.http.get(`${this.apiUrl}/sources/${source}&apiKey=${this.apiKey}`);
  }

  public resolve(): Observable<NewsBoard.ArticleResponseObject> {
    return this.getSources();
  }
}
