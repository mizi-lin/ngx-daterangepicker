import {
    AfterViewInit, Input, ElementRef, Directive, Output, EventEmitter, OnChanges,
    SimpleChanges, OnDestroy
} from '@angular/core';
import {$$DateRangePicker} from './daterangepicker.serv';
import * as moment from 'moment';
import './daterangepicker.js';
import * as mu from 'mzmu';

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
            this.datePicker = $elm.data('daterangepicker');
            // -> 根据maxDate and minDate 调整显示时间区间
            this.adjust(this.datePicker);

            this.picker.emit({
                picker: this.datePicker,
                options: this.options,
                range: {
                    start: this.datePicker.startDate,
                    end: this.datePicker.endDate
                }
            });

            /**
             * 硬插入季度选择器
             */
            mu.run(() => {

                let m = moment().clone();
                let year = m.year();

                let y2019 = `
                    <li>
                        <h5>2019</h5>
                        <div>
                            ${m > moment("2019-01-01") ? '<span data-start="2019-01-01" data-end="2019-03-31">JFM</span>' : ''}
                            ${m > moment("2019-04-01") ? '<span data-start="2019-04-01" data-end="2019-06-30">AMJ</span>' : '<span class="disabled">AMJ</span>'}
                            ${m > moment("2019-07-01") ? '<span data-start="2019-07-01" data-end="2019-09-30">JAS</span>' : '<span class="disabled">JAS</span>'}
                            ${m > moment("2019-10-01") ? '<span data-start="2019-10-01" data-end="2019-12-31">OND</span>' : '<span class="disabled">OND</span>'}
                        </div>   
                    </li>
                `;

                let y2020 = `
                    <li>
                        <h5>2020</h5>
                        <div>
                            ${m > moment("2020-01-01") ? '<span data-start="2020-01-01" data-end="2020-03-31">JFM</span>' : ''}
                            ${m > moment("2020-04-01") ? '<span data-start="2020-04-01" data-end="2020-06-30">AMJ</span>' : '<span class="disabled">AMJ</span>'}
                            ${m > moment("2020-07-01") ? '<span data-start="2020-07-01" data-end="2020-09-30">JAS</span>' : '<span class="disabled">JAS</span>'}
                            ${m > moment("2020-10-01") ? '<span data-start="2020-10-01" data-end="2020-12-31">OND</span>' : '<span class="disabled">OND</span>'}
                        </div>   
                    </li>
                `;

                let $calendar = <any>$(this.datePicker.container[0]);
                let $quarter = <any>$(`<div class="quarter">Quarter Picker </div>`);
                let $quarter_picker = <any>$(`<div class="quarter-picker">
                        <ol>
                            <li>
                                <h5>2016</h5>
                                <div>
                                    <span class="disabled">JFM</span>
                                    <span class="disabled">AMJ</span>
                                    <span data-start="2016-07-01" data-end="2016-09-30">JAS</span>
                                    <span data-start="2016-10-01" data-end="2016-12-31">OND</span>
                                </div>    
                            </li>
                            <li>
                                <h5>2017</h5>
                                <div>
                                    <span data-start="2017-01-01" data-end="2017-03-31">JFM</span>
                                    <span data-start="2017-04-01" data-end="2017-06-30">AMJ</span>
                                    <span data-start="2017-07-01" data-end="2017-09-30">JAS</span>
                                    <span data-start="2017-10-01" data-end="2017-12-31">OND</span>
                                </div>   
                            </li>
                            <li>
                                <h5>2018</h5>
                                <div>
                                    <span data-start="2018-01-01" data-end="2018-03-31">JFM</span>
                                    <span data-start="2018-04-01" data-end="2018-06-30">AMJ</span>
                                    <span data-start="2018-07-01" data-end="2018-09-30">JAS</span>
                                    <span data-start="2018-10-01" data-end="2018-12-31">OND</span>
                                </div>   
                            </li>
                            ${year === 2019 ? y2019 : ''}
                            ${year === 2020 ? y2020 : ''}
                        </ol>
                </div>`);
                $calendar.find('.ranges ul').after($quarter);
                $calendar.find('.ranges').after($quarter_picker);

                $quarter.on('click', () => {
                    $calendar.addClass('show-quarter-picker');
                    $calendar.removeClass('show-calendar');
                    $calendar.find('.ranges ul li').removeClass('active');
                });

                $calendar.find('.ranges ul li').hover(() => {
                    $calendar.removeClass('show-quarter-picker');
                });


                // 选择设置日期
                $quarter_picker.find('span:not(.disabled)').on('click', (e) => {
                    let elm = <any>$(e.target);
                    let start = elm.data('start');
                    let end = elm.data('end');
                    start = moment(start + 'T00:00:00.000');
                    end = moment(end + 'T00:00:00.000');

                    this.datePicker.setStartDate(start);
                    this.datePicker.setEndDate(end);
                    this.datePicker.hide();
                    $calendar.removeClass('show-quarter-picker');

                });

            });

            // $elm.on('show.daterangepicker', (ev, picker) => {
            //     // this.adjust(picker);
            // });
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
        let calc = (minDate: any, maxDate: any) => {
            minDate = moment(minDate);
            maxDate = moment(maxDate);

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
        };

        let start = moment(range[0]);
        let end = moment(range[1]);

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
            calc(minDate, maxDate);
        });

        // 最小时间存在, 最大时间不存在时
        mu.run(minDate && !maxDate, () => {
            let minDate_ = moment(minDate);
            let maxDate_ = moment('9999-12-31');
            calc(minDate_, maxDate_);
        });

        // 最大时间存在, 最大时间不存在时
        mu.run(!minDate && maxDate, () => {
            let maxDate_ = moment(maxDate);
            let minDate_ = moment('1900-01-01');
            calc(minDate_, maxDate_);
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
        let range = this.inMoment([
            o.startDate,
            o.endDate
        ], dp.minDate, dp.maxDate);
        dp.setStartDate(range[0]);
        dp.setEndDate(range[1]);
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
