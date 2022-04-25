import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { AppService } from './app.service';
import { Router } from '@angular/router';
import { AppLanguage } from './app.language';

@Injectable({
    providedIn: 'root'
})
export class AppControls {

    constructor(
        public location: Location,
        private appService: AppService,
        private router: Router,
        private language: AppLanguage,
    ) {
        this.language.default();
     }

    async getControls(roleID: string, pageUrl: string) {
        if (!pageUrl) {
            return;
        }
        let controlDefault = ['AddNew', 'Edit', 'Delete', 'Save'];


        switch (pageUrl) {

            case 'main-page': {
                controlDefault = ['Add','Delete','Edit','Get'];
                break;
            }
            default: {
                break;
            }
        }

        const dataRequest = {
            PageUrl: pageUrl,
            RoleID: roleID,
            Controls: controlDefault
        };
        const result = await this.appService.doPOST('api/Control/Check', dataRequest);
        const control: any = {};
        if (result && result.Status == 1 && result.Data && result.Data.length > 0) {
            result.Data.forEach((item: any) => {
                control[item.ID] = item.ActiveFlg;
            });
        }

        return control;
    }

    async getPageName() {
        let pageUrl = this.location.path();
        if (!pageUrl) {
            return null;
        }

        const idx = pageUrl.indexOf('?');
        if (idx >= 0) {
            pageUrl = pageUrl.substring(0, idx);
        }

        pageUrl = pageUrl.substring(1);

        const dataRequest = {
            id: pageUrl
        };
        const result: any = await this.appService.doGET('api/Page/GetName', dataRequest);
        if (result && result.Status === 1) {
            return result.Data;
        }
        return '';
    }

    async getPageNamePortal() {
        let pageUrl = this.location.path();
        if (!pageUrl) {
            return null;
        }

        const idx = pageUrl.indexOf('?');
        if (idx >= 0) {
            pageUrl = pageUrl.substring(0, idx);
        }

        pageUrl = pageUrl.substring(1);

        const dataRequest = {
            id: pageUrl,
            langID : this.language.get()
        };
        const result: any = await this.appService.doGET('api/Page/GetName', dataRequest);
        if (result && result.Status === 1) {
            return result.Data;
        }
        return '';
    }
}
