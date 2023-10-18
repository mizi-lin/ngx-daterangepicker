import { AfterViewInit, ElementRef, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { $$DateRangePicker } from './daterangepicker.serv';
import './daterangepicker.js';
export declare class $$daterangepickerDirective implements AfterViewInit, OnChanges, OnDestroy {
    private elm;
    private $$daterangepicker;
    options?: any;
    /**
     * 是否继承 server 设置的默认属性
     */
    inherit?: boolean;
    selected?: EventEmitter<any>;
    picker?: EventEmitter<any>;
    datePicker: any;
    constructor(elm: ElementRef, $$daterangepicker: $$DateRangePicker);
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    /**
     * 将range的时间范围计算在minDate的时间范围内
     * @param range
     * @param minDate
     * @param maxDate
     */
    private inMoment(range, minDate, maxDate);
    private rangesAdjust(options);
    private adjust(datePicker?);
    private callback(start?, end?, label?);
}
