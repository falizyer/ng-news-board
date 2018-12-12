import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SourceContainerComponent } from './source-container/source-container.component';
import { PaginationComponent } from './pagination/pagination.component';
import { FeedApiService } from './services/feed-api.service';
import { SourceSearchComponent } from './source-search/source-search.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    SourceContainerComponent,
    PaginationComponent,
    SourceSearchComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppRoutingModule
  ],
  exports: [
    SourceContainerComponent,
    PaginationComponent,
    SourceSearchComponent
  ],
  providers: [FeedApiService]
})
export class SharedModule { }
