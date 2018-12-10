import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsApiRepositoryService {

  private apiKey: string;
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiKey = 'b692d5f34dda413cab3001f0ee499f80';
    this.apiUrl = 'https://newsapi.org/v2';
  }

  public getSources(properties: any = {}): Observable<any> {
    const variables = [`apiKey=${this.apiKey}`];
    if (properties.language) {
      variables.push(`language=${properties.language}`);
    }
    const url = `${this.apiUrl}/sources?${variables.join('&')}`;
    return this.http.get(url);
  }

  public getArticleFromSource(source: string): Observable<any> {
    const url = `${this.apiUrl}/top-headlines?sources=${source}&apiKey=${this.apiKey}`;
    return this.http.get(url);
  }
}
