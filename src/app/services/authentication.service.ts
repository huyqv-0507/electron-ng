import { AppService } from '../services/app.service';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { AppLanguage } from './app.language';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AppConsts } from './app.consts';

@Injectable({ providedIn: 'root' })
export class AuthenticationService implements OnInit {

    public redirectUrl: string = '';
    public user: any = {};
    private headers: HttpHeaders = new HttpHeaders();
    private options = {};
    private tokenEndpoint: string;
    private clientId: string;
    

    public GUID_EMPTY = "00000000-0000-0000-0000-000000000000";
    ngOnInit(): void {
    }

    constructor(
        private http: HttpClient,
        private appService: AppService,
        private language: AppLanguage,
        private location: Location,
        private router: Router
    ) {
        this.decodeToken();
        this.tokenEndpoint = `${this.appService.apiRoot}/Token`;
        this.clientId = '';
    }

    getUser(): any {
        const result = localStorage.getItem(AppConsts.USER_INFO_STORAGE);
        if (result) {
            this.user = JSON.parse(result);
        }
        return this.user;
    }

    public async doSignIn(userName: string, password: string, type: number = 0) {

        this.headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
        this.headers.set('Accept-Language', this.language.get() as string);
        this.options = { headers: this.headers };

        const params: any = {
            type: type,
            client_id: this.clientId,
            grant_type: 'password',
            username: userName,
            password
        };

        const body: string = this.encodeParams(params);

        const result = await this.appService.doPOSTOPTION('Token', body, this.options);

        if (result.access_token) {
            if (result.OTPID === this.GUID_EMPTY && result.OTPID !== ""){
                this.store(result);
            }
            return {
                Status: 1,
                Data: result
            };
        } else {
            return {
                Status: 0,
                Msg: result.error_description
            };
        }

    }

     doSignout(): void {
        this.redirectUrl = '';
        localStorage.removeItem(AppConsts.USER_INFO_STORAGE);
        this.user = {};
        this.revokeToken();
        this.router.navigate([AppConsts.page.main])
    }

    public getNewToken(): void {

        const refreshToken: string | null = localStorage.getItem('refresh_token');

        if (refreshToken) {
            const params: any = {
                client_id: this.clientId,
                grant_type: 'refresh_token',
                refresh_token: refreshToken
            };

            const body: string = this.encodeParams(params);

            this.http.post(this.tokenEndpoint, body, this.options)
                .subscribe(
                    next => {

                        const loginInfo: any = next;

                        if (typeof loginInfo.access_token !== 'undefined') {
                            this.store(loginInfo);
                        }
                    });
        }
    }

    public revokeToken(): void {

        const token: string | null = localStorage.getItem('token');
        if (token != null) {
            localStorage.removeItem('token');
        }
    }

    public revokeRefreshToken(): void {

        const refreshToken: string | null = localStorage.getItem('refresh_token');

        if (refreshToken) {
            const params: any = {
                client_id: this.clientId,
                token_type_hint: 'refresh_token',
                token: refreshToken
            };

            const body: string = this.encodeParams(params);

            this.http.post(this.tokenEndpoint, body, this.options)
                .subscribe(
                    () => {
                        localStorage.removeItem('refresh_token');
                    });
        }
    }

    encodeParams(params: any): string {

        let body = '';
        // tslint:disable-next-line:prefer-const
        // tslint:disable-next-line:forin
        for (const param in params) {
            if (body.length) {
                body += '&';
            }
            body = `${body}${param}=`;
            body = `${body}${encodeURIComponent(params[param])}`;
        }

        return body;
    }

    store(body: any): void {
        // Stores access token in local storage to keep user signed in.
        localStorage.setItem('token', body.access_token);
        // Stores refresh token in local storage.
        localStorage.setItem('refresh_token', body.refresh_token);
        this.setUser(body);
        // Decodes the token.
        this.decodeToken();

    }

    setUser(data: any) {
        if (!data.FilePath ||
            (data.FilePath.indexOf('.png') < 0
            && data.FilePath.indexOf('.jpg') < 0
            && data.FilePath.indexOf('.jpeg') < 0
            && data.FilePath.indexOf('.gif') < 0
            && data.FilePath.indexOf('.bmp') < 0
        )) {
            data.FilePath = 'assets/images/userlogo.png';
        }
        localStorage.setItem(AppConsts.USER_INFO_STORAGE, JSON.stringify({
            UserName: data.UserName,
            FullName: data.FullName,
            RoleID: data.RoleID,
            RoleName: data.RoleName,
            FilePath: data.FilePath,
            AccountID: data.AccountID,
            UnitID: data.UnitID
        }));
    }

    decodeToken(): void {

    }  
}
