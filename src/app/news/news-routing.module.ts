import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsComponent } from './news.component';
import { NewsApiService } from './news-api.service';

const routes: Routes = [{
  path: 'news/:id', component: NewsComponent, resolve: {
    news: NewsApiService
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [NewsApiService]
})
export class NewsRoutingModule {
}
