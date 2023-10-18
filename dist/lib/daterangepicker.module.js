"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var daterangepicker_serv_1 = require("./daterangepicker.serv");
var daterangepicker_directive_1 = require("./daterangepicker.directive");
var daterangepicker_component_1 = require("./daterangepicker.component");
var DateRangePickerModule = (function () {
    function DateRangePickerModule() {
    }
    DateRangePickerModule.forRoot = function () {
        return {
            ngModule: DateRangePickerModule
        };
    };
    return DateRangePickerModule;
}());
DateRangePickerModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [
                    forms_1.FormsModule,
                    common_1.CommonModule
                ],
                declarations: [
                    daterangepicker_directive_1.$$daterangepickerDirective,
                    daterangepicker_component_1.$$DateRangePickerComponent
                ],
                /**
                 * 作为子模块, 若主模块需要使用, 那么必须使用 exports
                 */
                exports: [
                    daterangepicker_directive_1.$$daterangepickerDirective,
                    daterangepicker_component_1.$$DateRangePickerComponent
                ],
                providers: [
                    daterangepicker_serv_1.$$DateRangePicker
                ]
            },] },
];
/** @nocollapse */
DateRangePickerModule.ctorParameters = function () { return []; };
exports.DateRangePickerModule = DateRangePickerModule;
//# sourceMappingURL=daterangepicker.module.js.map