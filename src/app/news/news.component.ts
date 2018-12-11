import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsBoard } from '../index';
import { NewsApiRepositoryService } from '../shared/services/news-api-repository.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'nb-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  articles: NewsBoard.ArticleObject;

  constructor(private route: ActivatedRoute, private newsApiRepository: NewsApiRepositoryService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.newsApiRepository.getArticleFromSource(params['id'])
        .pipe(map(value => value.articles))
        .subscribe(articles => {
          this.articles = articles;
        });
    });
  }

}
