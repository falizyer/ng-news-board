import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SourceContainerComponent } from './source-container/source-container.component';
import { PaginationComponent } from './pagination/pagination.component';
import { RouterModule } from '@angular/router';

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
