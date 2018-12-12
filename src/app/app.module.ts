import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { FeedModule } from './feed/feed.module';
import { NewsModule } from './news/news.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

const imports = [
  BrowserModule,
  HttpClientModule,
  AppRoutingModule,
  DashboardModule,
  FeedModule,
  NewsModule
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports,
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
