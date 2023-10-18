import { OnChanges, SimpleChanges } from '@angular/core';
import { $$DateRangePicker } from './daterangepicker.serv';
export declare class $$DateRangePickerComponent implements OnChanges {
    private $$DateRangePicker;
    options: any;
    inherit: any;
    selected: any;
    picker: any;
    daterange: any;
    single: boolean;
    datePicker: any;
    constructor($$DateRangePicker: $$DateRangePicker);
    ngOnChanges(changes: SimpleChanges): void;
    selected_(rst: any): void;
    picker_(dp: any): void;
}
