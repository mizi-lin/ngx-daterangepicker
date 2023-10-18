import {
    Component,
    Input, OnChanges, SimpleChanges, enableProdMode, Output,
    EventEmitter, ViewEncapsulation
} from '@angular/core';
import {$$DateRangePicker} from './daterangepicker.serv';

enableProdMode();
@Component({
    selector: 'date-range-picker',
    styleUrls: ['/daterangepicker.css'],
    // -> This is the real deal as shadow DOM is completely enabled. Older browsers can go to hell
    // encapsulation: ViewEncapsulation.Native,
    // -> This actually tries to emulate Shadow DOM to give us the feel that we are scoping our styles. This is not a real Shadow DOM but a strategy to make all browsers smile at our code
    // encapsulation: ViewEncapsulation.Emulated,
    // -> None: All elements are spit out - no Shadow DOM at all.
    // -> 不使用shadow DOM
    encapsulation: ViewEncapsulation.None,
    template: `
        <div class="input-group"
             daterangepicker
             [inherit]="inherit"
             [options]="options"
             (picker)="picker_($event)"
             (selected)="selected_($event)">
            
            <span class="form-control uneditable-input" *ngIf="!single">
                  {{ daterange?.start | date:'yyyy-MM-dd' }} - {{ daterange?.end | date:'yyyy-MM-dd' }}
            </span>
            
            <span class="form-control uneditable-input" *ngIf="single">
                  {{ daterange?.start | date:'yyyy-MM-dd' }}
            </span>
            
            <span class="input-group-btn">
                <button type="button" class="btn btn-secondary">
                    <i class="icons icon-calendar"></i>
                </button>
            </span>
        </div>
    `
})
export class $$DateRangePickerComponent implements OnChanges {

    @Input() options: any;
    @Input() inherit: any;
    @Output() selected: any = new EventEmitter<any>();
    @Output() picker: any = new EventEmitter<any>();

    daterange: any = {};
    single: boolean;
    datePicker: any = {};

    constructor(private $$DateRangePicker: $$DateRangePicker) {
    }

    ngOnChanges(changes: SimpleChanges): void {

    }

    selected_(rst: any) {
        this.daterange = rst;
        this.selected.emit(rst);
    }

    picker_(dp: any) {
        this.daterange = {
            start: dp.picker.startDate,
            end: dp.picker.endDate
        };

        this.single = dp.options.singleDatePicker;
        this.picker.emit(dp);
    }

}
