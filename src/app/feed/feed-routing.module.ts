import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedComponent } from './feed.component';
import { FeedApiService } from '../shared/services/feed-api.service';

const routes: Routes = [
  {
    path: 'feed/:index', component: FeedComponent, resolve: {
      feeds: FeedApiService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedRoutingModule {
}
