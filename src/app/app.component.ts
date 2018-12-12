import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalizeRouterService } from 'localize-router';

@Component({
  selector: 'nb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  languages: string[] = ['en', 'ru'];

  constructor(private translate: TranslateService, private localize: LocalizeRouterService) {
    translate.setDefaultLang('en');
  }

  onChangeLanguage(language: string) {
    this.localize.changeLanguage(language)
  }
}
