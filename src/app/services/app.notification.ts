import { NotificationService } from '@progress/kendo-angular-notification';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Notification {

    private hideAfter = 2000;

    constructor(
        private notificationService: NotificationService
    ) {}

    showSuccess(msg: any) {
        this.notificationService.show({
            content: msg,
            position: { horizontal: 'right', vertical: 'bottom' },
            animation: { type: 'fade', duration: 800 },
            type: { style: 'success', icon: true },
            hideAfter: this.hideAfter,
        });
    }
    showWarning(msg: any) {
        this.notificationService.show({
            content: msg,
            position: { horizontal: 'center', vertical: 'bottom' },
            animation: { type: 'fade', duration: 800 },
            type: { style: 'warning', icon: true },
            hideAfter: this.hideAfter,
        });
    }
}
