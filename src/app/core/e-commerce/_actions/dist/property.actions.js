"use strict";
exports.__esModule = true;
var PropertyActionTypes;
(function (PropertyActionTypes) {
    PropertyActionTypes["PropertyOnServerCreated"] = "[Edit Property Component] Property On Server Created";
    PropertyActionTypes["PropertyCreated"] = "[Edit Property Component] Property Created";
    PropertyActionTypes["PropertyUpdated"] = "[Edit Property Component] Property Updated";
    PropertyActionTypes["PropertiesStatusUpdated"] = "[Properties List Page] Properties Status Updated";
    PropertyActionTypes["OnePropertyDeleted"] = "[Properties List Page] One Property Deleted";
    PropertyActionTypes["ManyPropertiesDeleted"] = "[Properties List Page] Many Selected Properties Deleted";
    PropertyActionTypes["PropertiesPageRequested"] = "[Properties List Page] Properties Page Requested";
    PropertyActionTypes["PropertiesPageLoaded"] = "[Properties API] Properties Page Loaded";
    PropertyActionTypes["PropertiesPageCancelled"] = "[Properties API] Properties Page Cancelled";
    PropertyActionTypes["PropertiesPageToggleLoading"] = "[Properties] Properties Page Toggle Loading";
    PropertyActionTypes["PropertiesActionToggleLoading"] = "[Properties] Properties Action Toggle Loading";
})(PropertyActionTypes = exports.PropertyActionTypes || (exports.PropertyActionTypes = {}));
var PropertyOnServerCreated = /** @class */ (function () {
    function PropertyOnServerCreated(payload) {
        this.payload = payload;
        this.type = PropertyActionTypes.PropertyOnServerCreated;
    }
    return PropertyOnServerCreated;
}());
exports.PropertyOnServerCreated = PropertyOnServerCreated;
var PropertyCreated = /** @class */ (function () {
    function PropertyCreated(payload) {
        this.payload = payload;
        this.type = PropertyActionTypes.PropertyCreated;
    }
    return PropertyCreated;
}());
exports.PropertyCreated = PropertyCreated;
var PropertyUpdated = /** @class */ (function () {
    function PropertyUpdated(payload) {
        this.payload = payload;
        this.type = PropertyActionTypes.PropertyUpdated;
    }
    return PropertyUpdated;
}());
exports.PropertyUpdated = PropertyUpdated;
var PropertiesStatusUpdated = /** @class */ (function () {
    function PropertiesStatusUpdated(payload) {
        this.payload = payload;
        this.type = PropertyActionTypes.PropertiesStatusUpdated;
    }
    return PropertiesStatusUpdated;
}());
exports.PropertiesStatusUpdated = PropertiesStatusUpdated;
var OnePropertyDeleted = /** @class */ (function () {
    function OnePropertyDeleted(payload) {
        this.payload = payload;
        this.type = PropertyActionTypes.OnePropertyDeleted;
    }
    return OnePropertyDeleted;
}());
exports.OnePropertyDeleted = OnePropertyDeleted;
var ManyPropertiesDeleted = /** @class */ (function () {
    function ManyPropertiesDeleted(payload) {
        this.payload = payload;
        this.type = PropertyActionTypes.ManyPropertiesDeleted;
    }
    return ManyPropertiesDeleted;
}());
exports.ManyPropertiesDeleted = ManyPropertiesDeleted;
var PropertiesPageRequested = /** @class */ (function () {
    function PropertiesPageRequested(payload) {
        this.payload = payload;
        this.type = PropertyActionTypes.PropertiesPageRequested;
    }
    return PropertiesPageRequested;
}());
exports.PropertiesPageRequested = PropertiesPageRequested;
var PropertiesPageLoaded = /** @class */ (function () {
    function PropertiesPageLoaded(payload) {
        this.payload = payload;
        this.type = PropertyActionTypes.PropertiesPageLoaded;
    }
    return PropertiesPageLoaded;
}());
exports.PropertiesPageLoaded = PropertiesPageLoaded;
var PropertiesPageCancelled = /** @class */ (function () {
    function PropertiesPageCancelled() {
        this.type = PropertyActionTypes.PropertiesPageCancelled;
    }
    return PropertiesPageCancelled;
}());
exports.PropertiesPageCancelled = PropertiesPageCancelled;
var PropertiesPageToggleLoading = /** @class */ (function () {
    function PropertiesPageToggleLoading(payload) {
        this.payload = payload;
        this.type = PropertyActionTypes.PropertiesPageToggleLoading;
    }
    return PropertiesPageToggleLoading;
}());
exports.PropertiesPageToggleLoading = PropertiesPageToggleLoading;
var PropertiesActionToggleLoading = /** @class */ (function () {
    function PropertiesActionToggleLoading(payload) {
        this.payload = payload;
        this.type = PropertyActionTypes.PropertiesActionToggleLoading;
    }
    return PropertiesActionToggleLoading;
}());
exports.PropertiesActionToggleLoading = PropertiesActionToggleLoading;

//# sourceMappingURL=property.actions.js.map
