import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Location } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { LocalizeParser, LocalizeRouterModule, LocalizeRouterSettings } from 'localize-router';
import { LocalizeRouterHttpLoader } from 'localize-router-http-loader';

import { DashboardComponent } from './dashboard/dashboard.component';
import { FeedComponent } from './feed/feed.component';
import { NewsComponent } from './news/news.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard', children: [
      { path: '', redirectTo: '1', pathMatch: 'full' },
      { path: ':index', component: DashboardComponent }
    ]
  },
  {
    path: 'feed', children: [
      { path: '', redirectTo: '/feed/1', pathMatch: 'full' },
      { path: ':index', component: FeedComponent }
    ]
  },
  {
    path: 'news', children: [
      { path: '', redirectTo: '/news/1', pathMatch: 'full' },
      { path: ':id', component: NewsComponent }
    ]
  }
];

export const childRoutes: Routes = [];

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/locales/', '.json');
}

export function HttpLoaderFactory(translate: TranslateService, location: Location, settings: LocalizeRouterSettings, http: HttpClient) {
  return new LocalizeRouterHttpLoader(translate, location, settings, http);
}

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    LocalizeRouterModule.forRoot(routes, {
      parser: {
        provide: LocalizeParser,
        useFactory: HttpLoaderFactory,
        deps: [TranslateService, Location, LocalizeRouterSettings, HttpClient]
      }
    }),
    RouterModule.forRoot(routes, { useHash: false }),
    LocalizeRouterModule.forChild(childRoutes),
    RouterModule.forChild(childRoutes)
  ],
  exports: [RouterModule, TranslateModule, LocalizeRouterModule],
  providers: [Location]
})
export class AppRoutingModule {
}
