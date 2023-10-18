"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var daterangepicker_serv_1 = require("./daterangepicker.serv");
var moment = require("moment");
require("./daterangepicker.js");
var mu = require("mzmu");
var $$daterangepickerDirective = (function () {
    function $$daterangepickerDirective(elm, $$daterangepicker) {
        this.elm = elm;
        this.$$daterangepicker = $$daterangepicker;
        this.options = {};
        /**
         * 是否继承 server 设置的默认属性
         */
        this.inherit = true;
        this.selected = new core_1.EventEmitter();
        this.picker = new core_1.EventEmitter();
    }
    $$daterangepickerDirective.prototype.ngOnChanges = function (changes) {
        var _this = this;
        mu.run(mu.prop(changes, 'options'), function () {
            mu.run(_this.datePicker, function () {
                _this.ngAfterViewInit();
            });
        });
    };
    $$daterangepickerDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.ngOnDestroy();
        var $elm = $(this.elm.nativeElement);
        mu.run($elm.length, function () {
            _this.options = $.extend(true, {}, _this.inherit ? _this.$$daterangepicker.options : {}, _this.options);
            /**
             * 重新计算ranges的时间范围
             */
            _this.rangesAdjust(_this.options);
            $elm.daterangepicker(_this.options, _this.callback.bind(_this));
            _this.datePicker = $elm.data('daterangepicker');
            // -> 根据maxDate and minDate 调整显示时间区间
            _this.adjust(_this.datePicker);
            _this.picker.emit({
                picker: _this.datePicker,
                options: _this.options,
                range: {
                    start: _this.datePicker.startDate,
                    end: _this.datePicker.endDate
                }
            });
            /**
             * 硬插入季度选择器
             */
            mu.run(function () {
                var m = moment().clone();
                var year = m.year();
                /* let y2019 = `
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
                `; */
                // 从19年至今
                var renderQuarterPickerLis = [];
                for (var i = 2019; i <= year; i++) {
                    var quarterOne = i + "-01-01";
                    var quarterOneEnd = i + "-03-31";
                    var quarterTwo = i + "-04-01";
                    var quarterTwoEnd = i + "-06-30";
                    var quarterThree = i + "-07-01";
                    var quarterThreeEnd = i + "-09-31";
                    var quarterFour = i + "-10-01";
                    var quarterFourEnd = i + "-12-31";
                    renderQuarterPickerLis.push("<li>\n                    <h5>" + i + "</h5>\n                    <div>\n                        " + (m > moment(quarterOne) ? '<span data-start="' + quarterOne + '" data-end="' + quarterOneEnd + '">JFM</span>' : '') + "\n                        " + (m > moment(quarterTwo) ? '<span data-start="' + quarterTwo + '" data-end="' + quarterTwoEnd + '">AMJ</span>' : '<span class="disabled">AMJ</span>') + "\n                        " + (m > moment(quarterThree) ? '<span data-start="' + quarterThree + '" data-end="' + quarterThreeEnd + '">JAS</span>' : '<span class="disabled">JAS</span>') + "\n                        " + (m > moment(quarterFour) ? '<span data-start="' + quarterFour + '" data-end="' + quarterFourEnd + '">OND</span>' : '<span class="disabled">OND</span>') + "\n                    </div>   \n                </li>");
                }
                var $calendar = $(_this.datePicker.container[0]);
                var $quarter = $("<div class=\"quarter\">Quarter Picker </div>");
                var $quarter_picker = $("<div class=\"quarter-picker\">\n                        <ol>\n                            <li>\n                                <h5>2016</h5>\n                                <div>\n                                    <span class=\"disabled\">JFM</span>\n                                    <span class=\"disabled\">AMJ</span>\n                                    <span data-start=\"2016-07-01\" data-end=\"2016-09-30\">JAS</span>\n                                    <span data-start=\"2016-10-01\" data-end=\"2016-12-31\">OND</span>\n                                </div>    \n                            </li>\n                            <li>\n                                <h5>2017</h5>\n                                <div>\n                                    <span data-start=\"2017-01-01\" data-end=\"2017-03-31\">JFM</span>\n                                    <span data-start=\"2017-04-01\" data-end=\"2017-06-30\">AMJ</span>\n                                    <span data-start=\"2017-07-01\" data-end=\"2017-09-30\">JAS</span>\n                                    <span data-start=\"2017-10-01\" data-end=\"2017-12-31\">OND</span>\n                                </div>   \n                            </li>\n                            <li>\n                                <h5>2018</h5>\n                                <div>\n                                    <span data-start=\"2018-01-01\" data-end=\"2018-03-31\">JFM</span>\n                                    <span data-start=\"2018-04-01\" data-end=\"2018-06-30\">AMJ</span>\n                                    <span data-start=\"2018-07-01\" data-end=\"2018-09-30\">JAS</span>\n                                    <span data-start=\"2018-10-01\" data-end=\"2018-12-31\">OND</span>\n                                </div>   \n                            </li>\n                            " + renderQuarterPickerLis.join('') + "\n                        </ol>\n                </div>");
                $calendar.find('.ranges ul').after($quarter);
                $calendar.find('.ranges').after($quarter_picker);
                $quarter.on('click', function () {
                    $calendar.addClass('show-quarter-picker');
                    $calendar.removeClass('show-calendar');
                    $calendar.find('.ranges ul li').removeClass('active');
                });
                $calendar.find('.ranges ul li').hover(function () {
                    $calendar.removeClass('show-quarter-picker');
                });
                // 选择设置日期
                $quarter_picker.find('span:not(.disabled)').on('click', function (e) {
                    var elm = $(e.target);
                    var start = elm.data('start');
                    var end = elm.data('end');
                    start = moment(start + 'T00:00:00.000');
                    end = moment(end + 'T00:00:00.000');
                    _this.datePicker.setStartDate(start);
                    _this.datePicker.setEndDate(end);
                    _this.datePicker.hide();
                    $calendar.removeClass('show-quarter-picker');
                });
            });
            // $elm.on('show.daterangepicker', (ev, picker) => {
            //     // this.adjust(picker);
            // });
        });
    };
    $$daterangepickerDirective.prototype.ngOnDestroy = function () {
        try {
            mu.run($(this.elm.nativeElement).data('daterangepicker'), function ($dp) {
                $dp.remove();
            });
        }
        catch (e) {
            console.log(e.message);
        }
    };
    /**
     * 将range的时间范围计算在minDate的时间范围内
     * @param range
     * @param minDate
     * @param maxDate
     */
    $$daterangepickerDirective.prototype.inMoment = function (range, minDate, maxDate) {
        var calc = function (minDate, maxDate) {
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
        var start = moment(range[0]);
        var end = moment(range[1]);
        // 开始时间与结束时间的间隔数(毫秒)
        var differ = end.diff(start);
        // 若结束时间早于开始时间, 则时间互换
        mu.run(differ < 0, function () {
            start = moment(range[1]);
            end = moment(range[0]);
            differ = -differ;
        });
        // 最大和最小时间同时存在
        mu.run(minDate && maxDate, function () {
            calc(minDate, maxDate);
        });
        // 最小时间存在, 最大时间不存在时
        mu.run(minDate && !maxDate, function () {
            var minDate_ = moment(minDate);
            var maxDate_ = moment('9999-12-31');
            calc(minDate_, maxDate_);
        });
        // 最大时间存在, 最大时间不存在时
        mu.run(!minDate && maxDate, function () {
            var maxDate_ = moment(maxDate);
            var minDate_ = moment('1900-01-01');
            calc(minDate_, maxDate_);
        });
        return [
            start,
            end
        ];
    };
    $$daterangepickerDirective.prototype.rangesAdjust = function (options) {
        var _this = this;
        var o = options;
        if (mu.isEmpty(o.ranges)) {
            return false;
        }
        mu.each(o.ranges, function (range, key) {
            o.ranges[key] = _this.inMoment(range, o.minDate, o.maxDate);
        });
    };
    $$daterangepickerDirective.prototype.adjust = function (datePicker) {
        var dp = datePicker, o = this.options;
        var range = this.inMoment([
            o.startDate,
            o.endDate
        ], dp.minDate, dp.maxDate);
        dp.setStartDate(range[0]);
        dp.setEndDate(range[1]);
    };
    $$daterangepickerDirective.prototype.callback = function (start, end, label) {
        var obj = {
            start: start,
            end: end,
            label: label
        };
        this.selected.emit(obj);
    };
    return $$daterangepickerDirective;
}());
$$daterangepickerDirective.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[daterangepicker]',
            },] },
];
/** @nocollapse */
$$daterangepickerDirective.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: daterangepicker_serv_1.$$DateRangePicker, },
]; };
$$daterangepickerDirective.propDecorators = {
    'options': [{ type: core_1.Input },],
    'inherit': [{ type: core_1.Input },],
    'selected': [{ type: core_1.Output },],
    'picker': [{ type: core_1.Output },],
};
exports.$$daterangepickerDirective = $$daterangepickerDirective;
//# sourceMappingURL=daterangepicker.directive.js.map