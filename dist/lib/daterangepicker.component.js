"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var daterangepicker_serv_1 = require("./daterangepicker.serv");
core_1.enableProdMode();
var $$DateRangePickerComponent = (function () {
    function $$DateRangePickerComponent($$DateRangePicker) {
        this.$$DateRangePicker = $$DateRangePicker;
        this.selected = new core_1.EventEmitter();
        this.picker = new core_1.EventEmitter();
        this.daterange = {};
        this.datePicker = {};
    }
    $$DateRangePickerComponent.prototype.ngOnChanges = function (changes) {
    };
    $$DateRangePickerComponent.prototype.selected_ = function (rst) {
        this.daterange = rst;
        this.selected.emit(rst);
    };
    $$DateRangePickerComponent.prototype.picker_ = function (dp) {
        this.daterange = {
            start: dp.picker.startDate,
            end: dp.picker.endDate
        };
        this.single = dp.options.singleDatePicker;
        this.picker.emit(dp);
    };
    return $$DateRangePickerComponent;
}());
$$DateRangePickerComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'date-range-picker',
                // styleUrls: ['/daterangepicker.css'],
                // -> This is the real deal as shadow DOM is completely enabled. Older browsers can go to hell
                // encapsulation: ViewEncapsulation.Native,
                // -> This actually tries to emulate Shadow DOM to give us the feel that we are scoping our styles. This is not a real Shadow DOM but a strategy to make all browsers smile at our code
                // encapsulation: ViewEncapsulation.Emulated,
                // -> None: All elements are spit out - no Shadow DOM at all.
                // -> 不使用shadow DOM
                encapsulation: core_1.ViewEncapsulation.None,
                template: "\n        <div class=\"input-group\"\n             daterangepicker\n             [inherit]=\"inherit\"\n             [options]=\"options\"\n             (picker)=\"picker_($event)\"\n             (selected)=\"selected_($event)\">\n            \n            <span class=\"form-control uneditable-input\" *ngIf=\"!single\">\n                  {{ daterange?.start | date:'yyyy-MM-dd' }} - {{ daterange?.end | date:'yyyy-MM-dd' }}\n            </span>\n            \n            <span class=\"form-control uneditable-input\" *ngIf=\"single\">\n                  {{ daterange?.start | date:'yyyy-MM-dd' }}\n            </span>\n            \n            <span class=\"input-group-btn\">\n                <button type=\"button\" class=\"btn btn-secondary\">\n                    <i class=\"icons icon-calendar\"></i>\n                </button>\n            </span>\n        </div>\n    "
            },] },
];
/** @nocollapse */
$$DateRangePickerComponent.ctorParameters = function () { return [
    { type: daterangepicker_serv_1.$$DateRangePicker, },
]; };
$$DateRangePickerComponent.propDecorators = {
    'options': [{ type: core_1.Input },],
    'inherit': [{ type: core_1.Input },],
    'selected': [{ type: core_1.Output },],
    'picker': [{ type: core_1.Output },],
};
exports.$$DateRangePickerComponent = $$DateRangePickerComponent;
//# sourceMappingURL=daterangepicker.component.js.map