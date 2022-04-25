import { HttpClient, HttpHeaders} from '@angular/common/http';

import { DomSanitizer } from '@angular/platform-browser';

//import { Http, Response, Headers, RequestOptions, URLSearchParams, ResponseContentType } from '@angular/http';
import { Injectable, OnInit } from '@angular/core';
import { resolve, reject } from 'q';
//import 'rxjs/add/operator/map';
//import { HttpHeaders } from '@angular/common/http';
import { AppLanguage } from './app.language';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AppConsts } from './app.consts';
@Injectable({
    providedIn: 'root'
})
export class AppService implements OnInit {
    // apiRoot = 'https://123.30.158.155:8004/';
    // clientRoot = 'https://123.30.158.155:8005/';
    // portalRoot = 'https://123.30.158.155:8003/';
    // apiRoot = 'https://api-daihoidoan.mallfinder.vn/';
    // clientRoot = 'https://admin-daihoidoan.mallfinder.vn/';
    // portalRoot = 'https://daihoidoan.mallfinder.vn/';
    apiTimeout = 'https://api-timeout.tuoitrethanhphobac.vn/';
    apiRoot = 'http://10.70.105.15:8015/';
    // apiRoot = 'http://localhost:8080/';
    clientRoot = 'http://localhost:4401/';
    portalRoot = 'http://localhost:4200/';

    options: any;
    timeInterval = 1000 * 30;
    user: any;
    domainAPI = '';
    ngOnInit(): void {
    }

    constructor(   private http: HttpClient,
        private language: AppLanguage,
        private location: Location,
        private router: Router
    ) {
        // tslint:disable-next-line:no-string-literal
        //this.apiRoot = `${this.location['_platformStrategy']._platformLocation.location.origin}/`;

        this.domainAPI = this.apiRoot;
        var startIdx = this.domainAPI.indexOf("//");

        var protocolSocket = "ws:";
        if (this.domainAPI.indexOf("https://") == 0) {
            protocolSocket = "wss:";
        }

        this.domainAPI = protocolSocket + this.domainAPI.substring(startIdx);
    }

    getUser(): any {
        const result = localStorage.getItem(AppConsts.USER_INFO_STORAGE);;
        if (result) {
            this.user = JSON.parse(result);
        }
        return this.user;
    }

    getUserName() {
        this.getUser();
        return this.user && this.user.UserName ? this.user.UserName : '';
    }

    createHeaders(): HttpHeaders {
        const token = localStorage.getItem('token');
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Accept-Language': this.language.get() ?  this.language.get() as string : AppConsts.defaultLangID,
            'UserName': this.getUserName(),
        });
        return headers;
    }

    createHeadersWithoutContentType(): HttpHeaders {

        const token = localStorage.getItem('token');
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Accept-Language': this.language.get() ?  this.language.get() as string : AppConsts.defaultLangID,
            'UserName': this.getUserName(),
        });

        return headers;
   }

    async doGET(methodUrl: any, params: any) {
        const apiURL = `${this.apiRoot}${methodUrl}`;
        try {
            const data = await this.http.get(apiURL, { headers: this.createHeaders(), params })
                .toPromise()
                .then(res => res, err => {
                    if (err.statusText === 'Unauthorized') {
                        //this.appSwal.showWarning(this.language.translate.instant('MsgUnauthorized'), false);
                     //  this.router.navigate([AppConsts.page.login]);
                    }
                    return null;
                });
            return data;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async doPOST(methodUrl: any, dataRequest: any) {
        const apiURL = `${this.apiRoot}${methodUrl}`;
        try {
            const data: any = await this.http.post(apiURL, dataRequest, { headers: this.createHeaders() })
                .toPromise()
                .then(res => res, err => {console.log(err); return data;});
            return data;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async doPOSTUploadFiles(methodUrl: any, dataRequest: any) {
        const apiURL = `${this.apiRoot}${methodUrl}`;
        try {
            const data: any = await this.http.post(apiURL, dataRequest, { headers: this.createHeadersWithoutContentType() })
                .toPromise()
                .then(res => res, err => {console.log(err); return data;});
            return data;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async doPOSTOPTION(methodUrl: any, dataRequest: any, options: any) {
        const apiURL = `${this.apiRoot}${methodUrl}`;
        try {
            const data: any = await this.http.post(apiURL, dataRequest, options)
                .toPromise()
                .then(res => res, err =>{ err.json(); return data});
            return data;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async doPUT(methodUrl: any, dataRequest: any, params: any) {
        const apiURL = `${this.apiRoot}${methodUrl}`;
        try {
            const data: any = await this.http.put(apiURL, dataRequest, { headers: this.createHeaders(), params })
                .toPromise()
                .then(res => res, err => {console.log(err); return data});
            return data;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async doDELETE(methodUrl: any, params: any) {
        const apiURL = `${this.apiRoot}${methodUrl}`;
        try {
            const data: any = await this.http.delete(apiURL, { headers: this.createHeaders(), params })
                .toPromise()
                .then(res => res, err => {console.log(err); return data});
            return data;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async doDownload(methodUrl: any, params: any) {
        const apiURL = `${this.apiRoot}${methodUrl}`;
        try {
            const data = await this.http.get(apiURL, { headers: this.createHeaders(), params, responseType: 'blob' as 'json' })
                .toPromise()
                .then(res => res, err => {
                    if (err.statusText === 'Unauthorized') {
                   //  this.router.navigate([AppConsts.page.login]);
                    }
                    return null;
                });
            return data;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    encodeParams(params: any): string {

        let body = '';
        for (const param in params) {
            if (body.length) {
                body += '&';
            }
            body = `${body}${param}=`;
            body = `${body}${encodeURIComponent(params[param])}`;
        }

        return body;
    }

    async doGETByTimeout(methodUrl: any, params: any) {
      const apiURL = `${this.apiTimeout}${methodUrl}`;
      try {
          const data = await this.http.get(apiURL, { headers: this.createHeaders(), params })
              .toPromise()
              .then(res => res, err => {
                  if (err.statusText === 'Unauthorized') {
                      //this.appSwal.showWarning(this.language.translate.instant('MsgUnauthorized'), false);
                   //  this.router.navigate([AppConsts.page.login]);
                  }
                  return null;
              });
          return data;
      } catch (e) {
          console.log(e);
          return null;
      }
  }
}
