import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AppConsts } from './services/app.consts';

const routes: Routes = [
  {
    path: AppConsts.page.main,
    component: MainPageComponent
  },
  {
    path: AppConsts.page.login,
    component: LoginComponent
  },
  // {
  //   path: AppConsts.page.socialNetwork,
  //   component: NewsFeedComponent,
  //   canActivate: [AuthGuard],
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
