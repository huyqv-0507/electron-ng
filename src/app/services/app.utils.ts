import { Injectable, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IntlService } from '@progress/kendo-angular-intl';

@Injectable({
    providedIn: 'root'
})
export class AppUtils implements OnInit {

    ngOnInit(): void {
    }

    constructor(
        private translate: TranslateService,
        public intl: IntlService
    ) {
    }

    public getDateByPeriod(period: any) {
        const result = {
            FromDate: new Date(),
            ToDate: new Date()
        };

        if (period === 6) {
            const currentMonth = result.FromDate.getMonth() - 1;
            if (currentMonth < 3) {
                period = 7;
            } else if (currentMonth < 6) {
                period = 8;
            } else if (currentMonth < 9) {
                period = 9;
            } else {
                period = 10;
            }
        }

        let day = result.FromDate.getDay();
        if (day === 0) {
            day = 7;
        }

        switch (period) {
            // last day
            case 0: {
                break;
            }
            // last day
            case 1: {
                result.FromDate.setDate(result.FromDate.getDate() - 1);
                result.ToDate = result.FromDate;
                break;
            }
            // next week
            case 13: {
                result.FromDate = new Date(result.FromDate.setDate(result.FromDate.getDate() + 7));
                const from = new Date(result.FromDate.setDate(result.FromDate.getDate() - day + 1));
                const temp = new Date(from);
                const to = new Date(temp.setDate(temp.getDate() + 6));
                result.FromDate = new Date(from.getFullYear(), from.getMonth(), from.getDate(), 0, 0, 0);
                result.ToDate = new Date(to.getFullYear(), to.getMonth(), to.getDate(), 23, 59, 59);
                break;
            }
            // this week
            // tslint:disable-next-line:no-switch-case-fall-through
            case 2: {
                const from = new Date(result.FromDate.setDate(result.FromDate.getDate() - day + 1));
                const temp = new Date(from);
                const to = new Date(temp.setDate(temp.getDate() + 6));
                result.FromDate = new Date(from.getFullYear(), from.getMonth(), from.getDate(), 0, 0, 0);
                result.ToDate = new Date(to.getFullYear(), to.getMonth(), to.getDate(), 23, 59, 59);
                break;
            }
            // last week
            // tslint:disable-next-line:no-switch-case-fall-through
            case 3: {
                result.FromDate = new Date(result.FromDate.setDate(result.FromDate.getDate() - 7));
                const from = new Date(result.FromDate.setDate(result.FromDate.getDate() - day + 1));
                const temp = new Date(from);
                const to = new Date(temp.setDate(temp.getDate() + 6));
                result.FromDate = new Date(from.getFullYear(), from.getMonth(), from.getDate(), 0, 0, 0);
                result.ToDate = new Date(to.getFullYear(), to.getMonth(), to.getDate(), 23, 59, 59);
                break;
            }
            // This month
            // tslint:disable-next-line:no-switch-case-fall-through
            case 4: {
                const from = new Date(result.FromDate.getFullYear(), result.FromDate.getMonth(), 1);
                const to = new Date(result.FromDate.getFullYear(), result.FromDate.getMonth() + 1, 0);
                result.FromDate = new Date(from.getFullYear(), from.getMonth(), from.getDate(), 0, 0, 0);
                result.ToDate = new Date(to.getFullYear(), to.getMonth(), to.getDate(), 23, 59, 59);
                break;
            }
            // Last month
            // tslint:disable-next-line:no-switch-case-fall-through
            case 5: {
                const from = new Date(result.FromDate.getFullYear(), result.FromDate.getMonth() - 1, 1);
                const to = new Date(result.FromDate.getFullYear(), result.FromDate.getMonth(), 0);
                result.FromDate = new Date(from.getFullYear(), from.getMonth(), from.getDate(), 0, 0, 0);
                result.ToDate = new Date(to.getFullYear(), to.getMonth(), to.getDate(), 23, 59, 59);
                break;
            }
            // 1 Quarter
            // tslint:disable-next-line:no-switch-case-fall-through
            case 7: {
                const from = new Date(result.FromDate.getFullYear(), 0, 1);
                const to = new Date(result.FromDate.getFullYear(), 3, 0);
                result.FromDate = new Date(from.getFullYear(), from.getMonth(), from.getDate(), 0, 0, 0);
                result.ToDate = new Date(to.getFullYear(), to.getMonth(), to.getDate(), 23, 59, 59);
                break;
            }
            // 2 Quarter
            // tslint:disable-next-line:no-switch-case-fall-through
            case 8: {
                const from = new Date(result.FromDate.getFullYear(), 3, 1);
                const to = new Date(result.FromDate.getFullYear(), 6, 0);
                result.FromDate = new Date(from.getFullYear(), from.getMonth(), from.getDate(), 0, 0, 0);
                result.ToDate = new Date(to.getFullYear(), to.getMonth(), to.getDate(), 23, 59, 59);
                break;
            }
            // 2 Quarter
            // tslint:disable-next-line:no-switch-case-fall-through
            case 9: {
                const from = new Date(result.FromDate.getFullYear(), 6, 1);
                const to = new Date(result.FromDate.getFullYear(), 9, 0);
                result.FromDate = new Date(from.getFullYear(), from.getMonth(), from.getDate(), 0, 0, 0);
                result.ToDate = new Date(to.getFullYear(), to.getMonth(), to.getDate(), 23, 59, 59);
                break;
            }
            // 2 Quarter
            // tslint:disable-next-line:no-switch-case-fall-through
            case 10: {
                const from = new Date(result.FromDate.getFullYear(), 9, 1);
                const to = new Date(result.FromDate.getFullYear(), 12, 0);
                result.FromDate = new Date(from.getFullYear(), from.getMonth(), from.getDate(), 0, 0, 0);
                result.ToDate = new Date(to.getFullYear(), to.getMonth(), to.getDate(), 23, 59, 59);
                break;
            }
            // This year
            // tslint:disable-next-line:no-switch-case-fall-through
            case 11: {
                const from = new Date(result.FromDate.getFullYear(), 0, 1);
                const to = new Date(result.FromDate.getFullYear(), 12, 0);
                result.FromDate = new Date(from.getFullYear(), from.getMonth(), from.getDate(), 0, 0, 0);
                result.ToDate = new Date(to.getFullYear(), to.getMonth(), to.getDate(), 23, 59, 59);
                break;
            }
            // Last year
            // tslint:disable-next-line:no-switch-case-fall-through
            case 12: {
                const from = new Date(result.FromDate.getFullYear() - 1, 0, 1);
                const to = new Date(result.FromDate.getFullYear() - 1, 12, 0);
                result.FromDate = new Date(from.getFullYear(), from.getMonth(), from.getDate(), 0, 0, 0);
                result.ToDate = new Date(to.getFullYear(), to.getMonth(), to.getDate(), 23, 59, 59);
                break;
            }
            default: {
                return null;
            }
        }

        return result;
    }

    public getDate(dataStr: any) {
        const result = {
            Value: new Date(),
            Display: ''
        };

        try {
            result.Value = this.intl.parseDate(dataStr, this.translate.instant('FormatDate'));
        } catch (e) {
            console.log(e);
        }

        result.Display = this.intl.formatDate(result.Value, this.translate.instant('FormatDate'));
        if (!result.Display || result.Display.indexOf('NaN') >= 0) {
            result.Display = '';
        }

        return result;
    }

    public getDate2(dataStr: any) {
        const result = {
            Value: new Date(),
            Display: ''
        };

        try {
            result.Value = this.intl.parseDate(dataStr, this.translate.instant('FormatDate2'));
        } catch (e) {
            console.log(e);
        }

        result.Display = this.intl.formatDate(result.Value, this.translate.instant('FormatDate2'));
        if (!result.Display || result.Display.indexOf('NaN') >= 0) {
            result.Display = '';
        }

        return result;
    }

    // input '1970-01-01T00:00:00' or '2019-07-01 13:58:27.087'. Output : 25/06/1994 or 1994-06-25T15:30:13 depend on FormatDate string
    public getDateTimeFromformat (dateTimestr : any, formatDate : any)     {
        // check invalid date
                // differ from cause it read from db
        //if (!(dateTimestr instanceof Date) || isNaN(dateTimestr.getTime()))     {return null;}
        if (dateTimestr == null || typeof dateTimestr == 'undefined' || dateTimestr.toString() == '' || dateTimestr.toString().toLowerCase() == 'null')    {return null;}
        var splitedDateTime = dateTimestr.toString().replace('T', '-');
        splitedDateTime = splitedDateTime.replace(' ', '-');
        var splitedDateTimearr = splitedDateTime.split('-');
        var day : any;  var month : any;    var year : any; var date : any;
        var hour : any;  var minute : any;    var seconds : any;
        year  = splitedDateTimearr[0];
        month = splitedDateTimearr[1];
        date  = splitedDateTimearr[2];
        hour = splitedDateTimearr[3].toLowerCase().split(':')[0];
        minute = splitedDateTimearr[3].toLowerCase().split(':')[1];
        seconds = splitedDateTimearr[3].toLowerCase().split(':')[2];
        if (formatDate == 'dd/MM/yyyy') {
            return `${date}/${month}/${year}`;
        }
        return `${year}-${month}-${date}T${splitedDateTimearr[3]}`;
    }

    public compareString(str1: string, str2: string, str3:string | null = null) {
        if (!str1 || !str2) {
            return false;
        }

        let result = str1.trim().toLowerCase() === str2.trim().toLowerCase();
        if (str3 && !result) {
            try {
                result = str1.trim().toLowerCase() === str3.trim().toLowerCase();
            } catch (e) { }
        }

        return result;
    }

    public getNameByList(list: any, id: any) {

        let i: any;
        for (i = 0; i < list.length; i++) {
            if (list[i].ID === id) {
                return list[i].Name;
            }
        }

        return '';
    }

    public getObjectByList(list: any, value: any) {

        return list.find((k: any) => k.ID === value || k.Name === value);
    }

    public getWeekday(dateStr: string) {
        var date = new Date(dateStr);
        var day = date.getDay();

        return day == 0 ? 'CN' : `Thứ ${day + 1}`;
    }

   public time_ago(time: any) {

        switch (typeof time) {
          case 'number':
            break;
          case 'string':
            time = +new Date(time);
            break;
          case 'object':
            if (time.constructor === Date) time = time.getTime();
            break;
          default:
            time = +new Date();
        }
        var time_formats = [
          [60, this.translate.instant('seconds'), 1], // 60
          [120, this.translate.instant('1MinuteAgo'), this.translate.instant('1MinuteFromNow')], // 60*2
          [3600, this.translate.instant('minutes'), 60], // 60*60, 60
          [7200, this.translate.instant('1HourAgo'), this.translate.instant('1HourFromNow')], // 60*60*2
          [86400, this.translate.instant('hours'), 3600], // 60*60*24, 60*60
          [172800, this.translate.instant('Yesterday'), this.translate.instant('Tomorrow')], // 60*60*24*2
          [604800, this.translate.instant('days'), 86400], // 60*60*24*7, 60*60*24
          [1209600, this.translate.instant('LastWeek'), this.translate.instant('NextWeek')], // 60*60*24*7*4*2
          [2419200,  this.translate.instant('weeks'), 604800], // 60*60*24*7*4, 60*60*24*7
          [4838400, this.translate.instant('LastMonth'), this.translate.instant('NextMonth')], // 60*60*24*7*4*2
          [29030400, this.translate.instant('months'), 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
          [58060800, this.translate.instant('LastYear'), this.translate.instant('NextYear')], // 60*60*24*7*4*12*2
          [2903040000,  this.translate.instant('years'), 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
          [5806080000, this.translate.instant('LastCentury'), this.translate.instant('NextCentury')], // 60*60*24*7*4*12*100*2
          [58060800000, this.translate.instant('centuries'), 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
        ];
        var seconds = (+new Date() - time) / 1000,
          token = this.translate.instant('ago'),
          list_choice = 1;
        if (seconds == 0) {
          return this.translate.instant('JustNow')
        }
        if (seconds < 0) {
          seconds = Math.abs(seconds);
          token = this.translate.instant('fromNow');
          list_choice = 2;
        }
        var i = 0,
          format;
        while (format = time_formats[i++])
          if (seconds < format[0]) {
            if (typeof format[2] == 'string')
              return format[list_choice];
            else
              return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
          }
        return time;
      }
      public isToday(time: any) {
        var timeFormatted = new Date(time);
        var today = new Date();
        if(today.toDateString() == timeFormatted.toDateString()){
          return true;
        }
        return false;
      }
  public onDotsString(string: string, maxValue: any) {
    var txtLength = 0;
    var orgString = string;
    if (orgString) {
      //dem ki tu hoa thuong
      var ascii = 0;
      var lastIdx = 0;
      for (let i = 0; i < orgString.length; i++) {
        ascii = orgString[i].charCodeAt(0);
        if (ascii >= 65 && ascii <= 90) {
          txtLength += 1.21875;
        } else {
          txtLength += 1;
        }
        lastIdx = i;
        if (txtLength >= maxValue) {
          break;
        }
      }
      if (txtLength <= maxValue && lastIdx == orgString.length - 1) {
        return string;
      }
      var idxSpace = orgString.lastIndexOf(' ', lastIdx);
      var newString = orgString.slice(0, idxSpace) + ' ...';
      return newString;
    }
  }
  
}
