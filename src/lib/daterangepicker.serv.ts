import {Injectable} from '@angular/core';
import * as mu from 'mzmu';
import * as moment from 'moment';
import * as $ from "jquery";

@Injectable()
export class $$DateRangePicker {
    constructor() {
    }

    options: any = {
        locale: {
            format: 'YYYY-MM-DD'
        },

        alwaysShowCalendars: false,

        ranges: {
            'Last 1 Week': [
                moment().subtract(1, 'week'),
                moment()
            ],
            'Last 1 Month': [
                moment().subtract(1, 'month'),
                moment()
            ],
            'Last 1 Quarter': [
                moment().subtract(3, 'month'),
                moment()
            ]
        }
    };

    datePicker: any;

    setOptions(options: any): void {
        options = $.extend(true, {}, this.options, options);
        this.options = options;
    }

}