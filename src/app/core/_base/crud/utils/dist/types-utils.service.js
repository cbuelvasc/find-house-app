"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var TypesUtilsService = /** @class */ (function () {
    function TypesUtilsService() {
    }
    TypesUtilsService.prototype.padNumber = function (value) {
        if (this.isNumber(value)) {
            return ("0" + value).slice(-2);
        }
        else {
            return '';
        }
    };
    TypesUtilsService.prototype.isNumber = function (value) {
        return !isNaN(this.toInteger(value));
    };
    TypesUtilsService.prototype.toInteger = function (value) {
        return parseInt("" + value, 10);
    };
    TypesUtilsService.prototype.dateFormat = function (date) {
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var year = date.getFullYear();
        if (date) {
            return month + "/" + day + "/" + year;
        }
        return '';
    };
    TypesUtilsService.prototype.dateCustomFormat = function (date) {
        var stringDate = '';
        if (date) {
            stringDate += this.isNumber(date.month) ? this.padNumber(date.month) + '/' : '';
            stringDate += this.isNumber(date.day) ? this.padNumber(date.day) + '/' : '';
            stringDate += date.year;
        }
        return stringDate;
    };
    TypesUtilsService.prototype.getDateFormatterFromString = function (dateInStr) {
        if (dateInStr && dateInStr.length > 0) {
            var dateParts = dateInStr.trim().split('/');
            return [
                {
                    year: this.toInteger(dateParts[2]),
                    month: this.toInteger(dateParts[0]),
                    day: this.toInteger(dateParts[1])
                }
            ];
        }
        var date = new Date();
        return [
            {
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                day: date.getDay()
            }
        ];
    };
    TypesUtilsService.prototype.getDateFromString = function (dateInStr) {
        if (dateInStr === void 0) { dateInStr = ''; }
        if (dateInStr && dateInStr.length > 0) {
            var dateParts = dateInStr.trim().split('/');
            var year = this.toInteger(dateParts[2]);
            var month = this.toInteger(dateParts[0]);
            var day = this.toInteger(dateParts[1]);
            // tslint:disable-next-line:prefer-const
            var result = new Date();
            result.setDate(day);
            result.setMonth(month - 1);
            result.setFullYear(year);
            return result;
        }
        return new Date();
    };
    TypesUtilsService.prototype.getDateStringFromDate = function (date) {
        if (date === void 0) { date = new Date(); }
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var dateToday = date.getDate();
        return month + "/" + dateToday + "/" + year;
    };
    TypesUtilsService = __decorate([
        core_1.Injectable()
    ], TypesUtilsService);
    return TypesUtilsService;
}());
exports.TypesUtilsService = TypesUtilsService;

//# sourceMappingURL=types-utils.service.js.map
