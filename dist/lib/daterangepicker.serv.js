"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var moment = require("moment");
var $ = require("jquery");
var $$DateRangePicker = (function () {
    function $$DateRangePicker() {
        this.options = {
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
    }
    $$DateRangePicker.prototype.setOptions = function (options) {
        options = $.extend(true, {}, this.options, options);
        this.options = options;
    };
    return $$DateRangePicker;
}());
$$DateRangePicker.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
$$DateRangePicker.ctorParameters = function () { return []; };
exports.$$DateRangePicker = $$DateRangePicker;
//# sourceMappingURL=daterangepicker.serv.js.map