import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryRepositoryService } from './in-memory-repository.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { FeedModule } from './feed/feed.module';
import { NewsModule } from './news/news.module';
import { environment } from '../environments/environment';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const imports = [
  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    }
  }),
  BrowserModule,
  AppRoutingModule,
  DashboardModule,
  FeedModule,
  NewsModule
];

if (environment.production) {
  imports.push(
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryRepositoryService, {
      dataEncapsulation: false,
      passThruUnknownUrl: true,
      apiBase: 'api/'
    })
  );
}

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
