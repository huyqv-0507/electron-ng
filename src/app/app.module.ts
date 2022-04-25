import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HttpClient, HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';
import { AppLanguage } from './services/app.language';
import { TokenInterceptor } from './services/token.interceptor';
import { WebSocketService } from './services/websocket.service';
import { MainPageComponent } from './main-page/main-page.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CustomTranslateLoader } from './services/custom.translate.loader';
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { LoginComponent } from './account/login/login.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: CustomTranslateLoader,
      },
    })
  ],
  providers: [
    AuthGuard,
    AuthService,
    AppLanguage,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    // {provide: LocationStrategy, useClass: PathLocationStrategy},
    WebSocketService,
    { provide: LOCALE_ID, useValue: "vi-VN" },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
