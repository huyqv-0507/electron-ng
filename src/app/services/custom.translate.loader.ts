import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs/internal/Observable';
import *  as en  from "src/assets/i18n/en-US.json";
import *  as vn  from "src/assets/i18n/vi-VN.json";
export class CustomTranslateLoader   implements TranslateLoader  {
  public getTranslation(lang: string): Observable<any> {
    return Observable.create((observer: any) => {
        observer.next(this.getLang(lang));
        observer.complete();
    });
  }
  getLang(lang:string){
    if(lang=='vi-VN'){
      return JSON.parse(JSON.stringify(vn)).default
    }
    else{
      return JSON.parse(JSON.stringify(en)).default
    }
  }
}
