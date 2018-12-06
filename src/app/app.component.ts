import { Component } from '@angular/core';

@Component({
  selector: 'nb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-news-board';

  constructor() {
    const subscriptions = [{
      category: 'general',
      country: 'us',
      description: 'Your trusted source for breaking news, analysis, exclusive interviews, headlines, and videos at ABCNews.com.',
      id: 'abc-news',
      language: 'en',
      name: 'ABC News',
      url: 'https://abcnews.go.com'
    }];
    window.localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
  }
}
