import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [
    DashboardComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [FilterPipe]
})
export class DashboardModule {
}
