import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { NewsBoard } from '..';
import { NewsApiRepositoryService } from '../shared/services/news-api-repository.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardApiService implements Resolve<NewsBoard.ArticleResponseObject> {

  constructor(private ewsApiRepositoryService: NewsApiRepositoryService) {
  }

  public resolve(): Observable<NewsBoard.ArticleResponseObject> {
    return this.ewsApiRepositoryService.getSources();
  }
}
