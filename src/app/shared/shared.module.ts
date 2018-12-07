import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SourceContainerComponent } from './source-container/source-container.component';
import { PaginationComponent } from './pagination/pagination.component';
import { FeedApiService } from './services/feed-api.service';

@NgModule({
  declarations: [
    SourceContainerComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SourceContainerComponent,
    PaginationComponent
  ],
  providers: [FeedApiService]
})
export class SharedModule { }
