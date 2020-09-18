"use strict";
exports.__esModule = true;
var QueryParamsModel = /** @class */ (function () {
    function QueryParamsModel(filter, sortOrder, sortField, pageNumber, pageSize) {
        if (sortOrder === void 0) { sortOrder = 'asc'; }
        if (sortField === void 0) { sortField = ''; }
        if (pageNumber === void 0) { pageNumber = 0; }
        if (pageSize === void 0) { pageSize = 10; }
        this.filter = filter;
        this.sortOrder = sortOrder;
        this.sortField = sortField;
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
    }
    return QueryParamsModel;
}());
exports.QueryParamsModel = QueryParamsModel;

//# sourceMappingURL=query-params.model.js.map
