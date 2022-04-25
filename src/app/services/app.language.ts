import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { AppConsts } from './app.consts';

@Injectable({
    providedIn: 'root'
})
export class AppLanguage {
    constructor(
        public translate: TranslateService
    ) { }

    set(lang: any) {
        this.translate.use(lang);
        localStorage.setItem('culture', lang);
    }

    default() {
        let lang = localStorage.getItem('culture');
        if (!lang) { lang = AppConsts.VIETNAMESE; }
        this.translate.setDefaultLang(lang);
    }

    setDefaultLanguage(){
      let lang = localStorage.getItem('culture');
      if (!lang) { lang = AppConsts.VIETNAMESE; }
      this.translate.setDefaultLang(lang);
      this.set(lang)
    }

    get() {
        return localStorage.getItem('culture');
    }
}
