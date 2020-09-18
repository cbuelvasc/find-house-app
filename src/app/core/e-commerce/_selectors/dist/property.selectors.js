"use strict";
exports.__esModule = true;
var store_1 = require("@ngrx/store");
var lodash_1 = require("lodash");
var crud_1 = require("../../_base/crud");
exports.selectPropertiesState = store_1.createFeatureSelector('properties');
exports.selectPropertyById = function (propertyId) { return store_1.createSelector(exports.selectPropertiesState, function (propertiesState) { return propertiesState.entities[propertyId]; }); };
exports.selectPropertiesPageLoading = store_1.createSelector(exports.selectPropertiesState, function (propertiesState) { return propertiesState.listLoading; });
exports.selectPropertiesActionLoading = store_1.createSelector(exports.selectPropertiesState, function (customersState) { return customersState.actionsloading; });
exports.selectPropertiesPageLastQuery = store_1.createSelector(exports.selectPropertiesState, function (propertiesState) { return propertiesState.lastQuery; });
exports.selectLastCreatedPropertyId = store_1.createSelector(exports.selectPropertiesState, function (propertiesState) { return propertiesState.lastCreatedPropertyId; });
exports.selectPropertiesInitWaitingMessage = store_1.createSelector(exports.selectPropertiesState, function (propertiesState) { return propertiesState.showInitWaitingMessage; });
exports.selectPropertiesInStore = store_1.createSelector(exports.selectPropertiesState, function (propertiesState) {
    var items = [];
    lodash_1.each(propertiesState.entities, function (element) {
        items.push(element);
    });
    var httpExtension = new crud_1.HttpExtenstionsModel();
    var result = httpExtension.sortArray(items, propertiesState.lastQuery.sortField, propertiesState.lastQuery.sortOrder);
    return new crud_1.QueryResultsModel(result, propertiesState.totalCount, '');
});
exports.selectHasPropertiesInStore = store_1.createSelector(exports.selectPropertiesInStore, function (queryResult) {
    // tslint:disable-next-line
    if (!queryResult.totalCount) {
        return false;
    }
    // tslint:disable-next-line
    return true;
});

//# sourceMappingURL=property.selectors.js.map
