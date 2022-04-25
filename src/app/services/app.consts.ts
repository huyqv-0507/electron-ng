import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class AppConsts {
    public static readonly defaultLangID = 'vi-VN';
    public static readonly VIETNAMESE = 'vi-VN';
    public static readonly ENGLISH = 'en-US';
    public static readonly USER_INFO_STORAGE: string = 'userInfoVeDienTu'

    public static readonly page = {
        login: 'login',
        main: ''
    }
}