import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsBoard } from '../index';

@Component({
  selector: 'nb-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  private articles: NewsBoard.ArticleObject;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    const { news } = this.route.snapshot.data;
    this.articles = news.articles;
    console.log(this.articles);
  }

}
