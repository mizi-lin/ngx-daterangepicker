import {NgModule, ModuleWithProviders} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {$$DateRangePicker} from './daterangepicker.serv';
import {$$daterangepickerDirective} from './daterangepicker.directive';
import {$$DateRangePickerComponent} from './daterangepicker.component';

@NgModule({
    imports: [
        FormsModule,
        CommonModule
    ],
    declarations: [
        $$daterangepickerDirective,
        $$DateRangePickerComponent
    ],

    /**
     * 作为子模块, 若主模块需要使用, 那么必须使用 exports
     */
    exports: [
        $$daterangepickerDirective,
        $$DateRangePickerComponent
    ],

    providers: [
        $$DateRangePicker
    ]
})
export class DateRangePickerModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: DateRangePickerModule
        };
    }
}