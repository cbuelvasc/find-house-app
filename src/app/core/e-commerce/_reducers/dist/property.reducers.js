"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _a;
exports.__esModule = true;
var store_1 = require("@ngrx/store");
var entity_1 = require("@ngrx/entity");
var property_actions_1 = require("../_actions/property.actions");
var crud_1 = require("../../_base/crud");
exports.adapter = entity_1.createEntityAdapter();
exports.initialPropertiesState = exports.adapter.getInitialState({
    listLoading: false,
    actionsloading: false,
    totalCount: 0,
    lastQuery: new crud_1.QueryParamsModel({}),
    lastCreatedPropertyId: undefined,
    showInitWaitingMessage: true
});
function propertiesReducer(state, action) {
    if (state === void 0) { state = exports.initialPropertiesState; }
    switch (action.type) {
        case property_actions_1.PropertyActionTypes.PropertiesPageToggleLoading:
            return __assign(__assign({}, state), { listLoading: action.payload.isLoading, lastCreatedPropertyId: undefined });
        case property_actions_1.PropertyActionTypes.PropertiesActionToggleLoading:
            return __assign(__assign({}, state), { actionsloading: action.payload.isLoading });
        case property_actions_1.PropertyActionTypes.PropertyOnServerCreated:
            return __assign({}, state);
        case property_actions_1.PropertyActionTypes.PropertyCreated:
            return exports.adapter.addOne(action.payload.property, __assign(__assign({}, state), { lastCreatedPropertyId: action.payload.property.id }));
        case property_actions_1.PropertyActionTypes.PropertyUpdated:
            return exports.adapter.updateOne(action.payload.partialProperty, state);
        case property_actions_1.PropertyActionTypes.PropertiesStatusUpdated: {
            // tslint:disable-next-line
            var _partialProperties = [];
            // tslint:disable-next-line
            for (var i = 0; i < action.payload.properties.length; i++) {
                _partialProperties.push({
                    id: action.payload.properties[i].id,
                    changes: {
                    // status: action.payload.status
                    }
                });
            }
            return exports.adapter.updateMany(_partialProperties, state);
        }
        case property_actions_1.PropertyActionTypes.OnePropertyDeleted:
            return exports.adapter.removeOne(action.payload.id, state);
        case property_actions_1.PropertyActionTypes.ManyPropertiesDeleted:
            return exports.adapter.removeMany(action.payload.ids, state);
        case property_actions_1.PropertyActionTypes.PropertiesPageCancelled:
            return __assign(__assign({}, state), { listLoading: false, lastQuery: new crud_1.QueryParamsModel({}) });
        case property_actions_1.PropertyActionTypes.PropertiesPageLoaded:
            return exports.adapter.addMany(action.payload.properties, __assign(__assign({}, exports.initialPropertiesState), { totalCount: action.payload.totalCount, listLoading: false, lastQuery: action.payload.page, showInitWaitingMessage: false }));
        default:
            return state;
    }
}
exports.propertiesReducer = propertiesReducer;
exports.getPropertiestate = store_1.createFeatureSelector('properties');
exports.selectAll = (_a = exports.adapter.getSelectors(), _a.selectAll), exports.selectEntities = _a.selectEntities, exports.selectIds = _a.selectIds, exports.selectTotal = _a.selectTotal;

//# sourceMappingURL=property.reducers.js.map
