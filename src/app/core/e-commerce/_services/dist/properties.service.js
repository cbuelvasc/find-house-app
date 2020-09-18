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
var rxjs_1 = require("rxjs");
var crud_1 = require("../../_base/crud");
var environment_1 = require("../../../../environments/environment");
var API_PROPERTIES_URL = 'http://localhost:3000/api/property';
var PropertiesService = /** @class */ (function () {
    function PropertiesService(http, httpUtils) {
        this.http = http;
        this.httpUtils = httpUtils;
        this.url = '../../../../assets/data/';
        this.lastFilter$ = new rxjs_1.BehaviorSubject(new crud_1.QueryParamsModel({}, 'asc', '', 0, 10));
    }
    PropertiesService.prototype.getFeaturedProperties = function () {
        return this.http.get(this.url + "featured-properties.json");
    };
    PropertiesService.prototype.getProperties = function () {
        return this.http.get(API_PROPERTIES_URL);
    };
    PropertiesService.prototype.getPropertyByIdTwo = function (id) {
        return this.http.get(this.url + "property-" + id + ".json");
    };
    PropertiesService.prototype.getPropertyTypes = function () {
        return [
            { id: 1, name: 'Office' },
            { id: 2, name: 'House' },
            { id: 3, name: 'Apartment' }
        ];
    };
    PropertiesService.prototype.createProperty = function (property) {
        var httpHeaders = this.httpUtils.getHTTPHeaders();
        return this.http.post(API_PROPERTIES_URL, property, { headers: httpHeaders });
    };
    PropertiesService.prototype.getAllProperties = function () {
        return this.http.get(API_PROPERTIES_URL);
    };
    PropertiesService.prototype.getPropertyById = function (propertyId) {
        return this.http.get(API_PROPERTIES_URL + ("/" + propertyId));
    };
    PropertiesService.prototype.findProperties = function (queryParams) {
        console.log('findProperties');
        return this.http.post(API_PROPERTIES_URL + '/findProperties', queryParams, { headers: this.httpHeaders() });
    };
    PropertiesService.prototype.updateProperty = function (property) {
        var httpHeaders = this.httpUtils.getHTTPHeaders();
        return this.http.put(API_PROPERTIES_URL, property, { headers: httpHeaders });
    };
    PropertiesService.prototype.updateStatusForProperty = function (property, status) {
        var httpHeaders = this.httpUtils.getHTTPHeaders();
        var body = {
            productsForUpdate: property,
            newStatus: status
        };
        var url = API_PROPERTIES_URL + '/updateStatus';
        return this.http.put(url, body, { headers: httpHeaders });
    };
    PropertiesService.prototype.deleteProperty = function (propertyId) {
        var url = API_PROPERTIES_URL + "/" + propertyId;
        return this.http["delete"](url);
    };
    PropertiesService.prototype.deleteProperties = function (ids) {
        if (ids === void 0) { ids = []; }
        var url = API_PROPERTIES_URL + '/delete';
        var httpHeaders = this.httpUtils.getHTTPHeaders();
        var body = { prdocutIdsForDelete: ids };
        return this.http.put(url, body, { headers: httpHeaders });
    };
    PropertiesService.prototype.httpHeaders = function () {
        var userToken = localStorage.getItem(environment_1.environment.authTokenKey);
        var httpHeaders = new http_1.HttpHeaders();
        httpHeaders = httpHeaders.set('Content-Type', 'application/json');
        httpHeaders = httpHeaders.set('Authorization', "Bearer " + userToken);
        return httpHeaders;
    };
    PropertiesService = __decorate([
        core_1.Injectable()
    ], PropertiesService);
    return PropertiesService;
}());
exports.PropertiesService = PropertiesService;

//# sourceMappingURL=properties.service.js.map
