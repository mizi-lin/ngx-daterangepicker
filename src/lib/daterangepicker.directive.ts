import {
    AfterViewInit, Input, ElementRef, Directive, Output, EventEmitter, OnChanges,
    SimpleChanges, OnDestroy
} from '@angular/core';
import {$$DateRangePicker} from 'ngx-daterangepicker';
import * as mu from 'mzmu';
import * as $ from "jquery";
import 'bootstrap-daterangepicker';
import * as moment from 'moment';

@Directive({
    selector: '[daterangepicker]',
})
export class $$daterangepickerDirective implements AfterViewInit, OnChanges, OnDestroy {
    @Input() options?: any = {};
    /**
     * 是否继承 server 设置的默认属性
     */
    @Input() inherit?: boolean = true;
    @Output() selected?: EventEmitter<any> = new EventEmitter<any>();
    @Output() picker?: EventEmitter<any> = new EventEmitter<any>();

    datePicker: any;

    constructor(private elm: ElementRef,
                private $$daterangepicker: $$DateRangePicker) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        mu.run(mu.prop(changes, 'options'), () => {
            mu.run(this.datePicker, () => {
                this.ngAfterViewInit();
            });
        });
    }

    ngAfterViewInit(): void {
        this.ngOnDestroy();
        let $elm = <any>$(this.elm.nativeElement);
        mu.run($elm.length, () => {
            this.options = $.extend(true, {}, this.inherit ? this.$$daterangepicker.options : {}, this.options);

            /**
             * 重新计算ranges的时间范围
             */
            this.rangesAdjust(this.options);

            $elm.daterangepicker(this.options, this.callback.bind(this));
            this.datePicker = (<any>$(this.elm.nativeElement)).data('daterangepicker');
            this.adjust(this.datePicker);
            this.picker.emit({
                picker: this.datePicker,
                options: this.options,
                range: {
                    start: this.datePicker.startDate,
                    end: this.datePicker.endDate
                }
            });

            $elm.on('apply.daterangepicker', (ev, picker) => {
                this.adjust(picker);
            });
        });
    }

    ngOnDestroy() {
        try {
            mu.run((<any>$(this.elm.nativeElement)).data('daterangepicker'), ($dp) => {
                $dp.remove();
            });
        } catch (e) {
            console.log(e.message);
        }
    }

    /**
     * 将range的时间范围计算在minDate的时间范围内
     * @param range
     * @param minDate
     * @param maxDate
     */
    private inMoment(range: any[], minDate: any, maxDate: any): any[] {
        let start = moment(range[0]);
        let end = moment(range[1]);
        minDate = moment(minDate);
        maxDate = moment(maxDate);

        // 开始时间与结束时间的间隔数(毫秒)
        let differ = end.diff(start);

        // 若结束时间早于开始时间, 则时间互换
        mu.run(differ < 0, () => {
            start = moment(range[1]);
            end = moment(range[0]);
            differ = -differ;
        });

        // 最大和最小时间同时存在
        mu.run(minDate && maxDate, () => {
            // 如果结束时间大于最大时间, 则 结束时间 = 最大时间
            if (end.diff(maxDate) > 0) {
                end = maxDate.clone();
                // 重新计算开始时间
                start = end.clone().subtract(differ);
            }

            // 若最小时间还晚于调整后的开始时间, 则 开始时间 = 最小时间
            if (minDate.diff(start) > 0) {
                start = minDate.clone();
            }
        });

        return [
            start,
            end
        ];
    }

    private rangesAdjust(options: any): any {
        let o = options;
        if (mu.isEmpty(o.ranges)) {
            return false;
        }

        mu.each(o.ranges, (range, key) => {
            o.ranges[key] = this.inMoment(range, o.minDate, o.maxDate);
        });

    }

    private adjust(datePicker?: any): void {
        let dp = datePicker, o = this.options;
        mu.run(dp.startDate.diff(dp.endDate), (mm) => {
            if (mm > 0) {
                if (o.startDate && o.endDate) {
                    let mm_ = moment(o.endDate).diff(o.startDate);
                    dp.setStartDate(dp.endDate.clone().subtract(mm_));
                }
            }
        });

        dp.isAdjust = (!!dp.startDate.diff(o.startDate || moment())) && (!!dp.endDate.diff(o.endDate || moment()));
    }

    private callback(start?: any, end?: any, label?: any): void {
        let obj = {
            start: start,
            end: end,
            label: label
        };

        this.selected.emit(obj);
    }

}
