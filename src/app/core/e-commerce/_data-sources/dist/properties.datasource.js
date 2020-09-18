"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var store_1 = require("@ngrx/store");
var crud_1 = require("../../_base/crud");
var property_selectors_1 = require("../_selectors/property.selectors");
var PropertiesDataSource = /** @class */ (function (_super) {
    __extends(PropertiesDataSource, _super);
    function PropertiesDataSource(store) {
        var _this = _super.call(this) || this;
        _this.store = store;
        _this.loading$ = _this.store.pipe(store_1.select(property_selectors_1.selectPropertiesPageLoading));
        _this.isPreloadTextViewed$ = _this.store.pipe(store_1.select(property_selectors_1.selectPropertiesInitWaitingMessage));
        _this.store.pipe(store_1.select(property_selectors_1.selectPropertiesInStore)).subscribe(function (response) {
            _this.paginatorTotalSubject.next(response.totalCount);
            _this.entitySubject.next(response.items);
        });
        return _this;
    }
    return PropertiesDataSource;
}(crud_1.BaseDataSource));
exports.PropertiesDataSource = PropertiesDataSource;

//# sourceMappingURL=properties.datasource.js.map
