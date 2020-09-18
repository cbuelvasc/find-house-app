"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var Chart_min_js_1 = require("chart.js/dist/Chart.min.js");
var SparklineChartDirective = /** @class */ (function () {
    function SparklineChartDirective(el, layoutConfigService) {
        this.el = el;
        this.layoutConfigService = layoutConfigService;
    }
    SparklineChartDirective.prototype.ngAfterViewInit = function () {
        this.initChart(this.el.nativeElement, this.options.data, this.options.color, this.options.border, this.options.fill, this.options.tooltip);
    };
    SparklineChartDirective.prototype.initChart = function (src, data, color, border, fill, tooltip) {
        if (src.length === 0) {
            return;
        }
        // set default values
        fill = (typeof fill !== 'undefined') ? fill : false;
        tooltip = (typeof tooltip !== 'undefined') ? tooltip : false;
        var config = {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October'],
                datasets: [{
                        label: '',
                        borderColor: color,
                        borderWidth: border,
                        pointHoverRadius: 4,
                        pointHoverBorderWidth: 12,
                        pointBackgroundColor: Chart_min_js_1.Chart.helpers.color('#000000').alpha(0).rgbString(),
                        pointBorderColor: Chart_min_js_1.Chart.helpers.color('#000000').alpha(0).rgbString(),
                        pointHoverBackgroundColor: this.layoutConfigService.getConfig('colors.state.danger'),
                        pointHoverBorderColor: Chart_min_js_1.Chart.helpers.color('#000000').alpha(0.1).rgbString(),
                        fill: false,
                        data: data
                    }]
            },
            options: {
                title: {
                    display: false
                },
                tooltips: {
                    enabled: false,
                    intersect: false,
                    mode: 'nearest',
                    xPadding: 10,
                    yPadding: 10,
                    caretPadding: 10
                },
                legend: {
                    display: false,
                    labels: {
                        usePointStyle: false
                    }
                },
                responsive: true,
                maintainAspectRatio: true,
                hover: {
                    mode: 'index'
                },
                scales: {
                    xAxes: [{
                            display: false,
                            gridLines: false,
                            scaleLabel: {
                                display: true,
                                labelString: 'Month'
                            }
                        }],
                    yAxes: [{
                            display: false,
                            gridLines: false,
                            scaleLabel: {
                                display: true,
                                labelString: 'Value'
                            },
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                },
                elements: {
                    point: {
                        radius: 4,
                        borderWidth: 12
                    }
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 10,
                        top: 5,
                        bottom: 0
                    }
                }
            }
        };
        this.chart = new Chart_min_js_1.Chart(src, config);
    };
    SparklineChartDirective.prototype.getChart = function () {
        return this.chart;
    };
    __decorate([
        core_1.Input()
    ], SparklineChartDirective.prototype, "options");
    SparklineChartDirective = __decorate([
        core_1.Directive({
            selector: '[appSparklineChart]',
            exportAs: 'appSparklineChart'
        })
    ], SparklineChartDirective);
    return SparklineChartDirective;
}());
exports.SparklineChartDirective = SparklineChartDirective;

//# sourceMappingURL=sparkline-chart.directive.js.map
