import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { NewsApiRepositoryService } from '../shared/services/news-api-repository.service';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService implements Resolve<any> {

  constructor(private newsApiRepositoryService: NewsApiRepositoryService) { }

  public resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.newsApiRepositoryService.getArticleFromSource(route.params.id);
  }
}
