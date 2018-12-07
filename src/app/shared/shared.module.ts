import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SourceContainerComponent } from './source-container/source-container.component';
import { PaginationComponent } from './pagination/pagination.component';

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
  ]
})
export class SharedModule { }
