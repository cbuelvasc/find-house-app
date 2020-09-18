"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var http_extentsions_model_1 = require("../../crud/models/http-extentsions-model");
var HttpUtilsService = /** @class */ (function () {
    function HttpUtilsService() {
    }
    HttpUtilsService.prototype.getFindHTTPParams = function (queryParams) {
        return new http_1.HttpParams()
            .set('lastNamefilter', queryParams.filter)
            .set('sortOrder', queryParams.sortOrder)
            .set('sortField', queryParams.sortField)
            .set('pageNumber', queryParams.pageNumber.toString())
            .set('pageSize', queryParams.pageSize.toString());
    };
    HttpUtilsService.prototype.getHTTPHeaders = function () {
        var result = new http_1.HttpHeaders();
        result = result.set('Content-Type', 'application/json');
        return result;
    };
    HttpUtilsService.prototype.baseFilter = function (entities, queryParams, filtrationFields) {
        if (filtrationFields === void 0) { filtrationFields = []; }
        var httpExtension = new http_extentsions_model_1.HttpExtenstionsModel();
        return httpExtension.baseFilter(entities, queryParams, filtrationFields);
    };
    HttpUtilsService.prototype.sortArray = function (incomingArray, sortField, sortOrder) {
        if (sortField === void 0) { sortField = ''; }
        if (sortOrder === void 0) { sortOrder = 'asc'; }
        var httpExtension = new http_extentsions_model_1.HttpExtenstionsModel();
        return httpExtension.sortArray(incomingArray, sortField, sortOrder);
    };
    HttpUtilsService.prototype.searchInArray = function (incomingArray, queryObj, filtrationFields) {
        if (filtrationFields === void 0) { filtrationFields = []; }
        var httpExtension = new http_extentsions_model_1.HttpExtenstionsModel();
        return httpExtension.searchInArray(incomingArray, queryObj, filtrationFields);
    };
    HttpUtilsService = __decorate([
        core_1.Injectable()
    ], HttpUtilsService);
    return HttpUtilsService;
}());
exports.HttpUtilsService = HttpUtilsService;

//# sourceMappingURL=http-utils.service.js.map
