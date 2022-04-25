import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Location } from '@angular/common';
import { AppService } from './app.service';
import { TranslateService } from '@ngx-translate/core';
import { AppConsts } from './app.consts';
import { AuthenticationService } from './authentication.service';
/**
 * Decides if a route can be activated.
 */
@Injectable() export class AuthGuard implements CanActivate {

    constructor(
        public authService: AuthService,
        public router: Router,
        public appService: AppService,
        public authenticationService: AuthenticationService,
        public location: Location
    ) { }

    public async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        await this.getTokenByUrl(route);

        if (this.authService.isAuthenticated()) {
            const result = await this.checkRole(route.routeConfig?route.routeConfig.path as string:'');
            return result;
        }

        this.router.navigate([AppConsts.page.login]);
        return false;
    }

    async checkRole(url: string) {
        this.authenticationService.getUser();
        const user = this.authenticationService.user;
        const roleID = user.RoleID;

        const result: any = await this.appService.doGET('api/Page/Check', { roleID, url });
        if (result) {
            if (result.Status === 1) {
                return true;
            } else {
                console.log(result.Msg)
            }
        }
        return false;
    }

    async getTokenByUrl(route: any) {
        var token = route.queryParams['token'];
        var userName =  route.queryParams['userName'];
        var webFlg =  route.queryParams['webFlg'];
        if (token && userName) {
          localStorage.setItem('token', token);
          if (webFlg != 1){
            localStorage.setItem('mbWebviewFlg', '1');
          }
          
          var dataRequest = {
            userName
          };
      
          const result: any = await this.appService.doGET('api/User/GetUserLoginInfo', dataRequest);
          if (result && result.Status === 1) {
            result.Data['access_token']= token;
            this.authenticationService.store(result.Data);

            var meetingID =  route.queryParams['meetingID'];
            var params = {};
            if (meetingID) {
                params = { queryParams: { meetingID } };
            }

            var socialNetworkID =  route.queryParams['socialNetworkID'];
            if (socialNetworkID != null) {
                params = { queryParams: { socialNetworkID } };
            }

            var postID =  route.queryParams['postID'];
            if (postID != null) {
                params = { queryParams: { postID } };
            }

            var districtID =  route.queryParams['districtID'];
            if (districtID != null) {
                params = { queryParams: { districtID } };
            }

            this.router.navigate([route.routeConfig.path], params);
          }
        }
    }

}