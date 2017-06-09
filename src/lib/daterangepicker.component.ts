import {
    Component, OnInit, Input, OnChanges, SimpleChanges, AfterViewInit, enableProdMode, Output,
    EventEmitter, AfterContentChecked, AfterViewChecked
} from '@angular/core';
import {$$DateRangePicker} from 'ngx-daterangepicker';
import 'bootstrap-daterangepicker';
import * as mu from 'mzmu';
import * as moment from 'moment';


enableProdMode();
@Component({
    selector: 'date-range-picker',
    template: `
        <div class="input-group"
             daterangepicker
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
    @Output() selected: any = new EventEmitter<any>();
    @Output() picker: any = new EventEmitter<any>();

    daterange: any = {};
    single: boolean;
    datePicker: any = {};

    constructor(
        private $$daterangepicker: $$DateRangePicker
    ) {
    }

    ngOnChanges(changes: SimpleChanges): void {

    }

    selected_(rst: any){
        this.daterange = rst;
        this.selected.emit(rst);
    }

    picker_(dp: any){
        this.daterange = {
            start: dp.picker.startDate,
            end: dp.picker.endDate
        };

        this.single = dp.options.singleDatePicker;
        this.picker.emit(dp);
    }



}