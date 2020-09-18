"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var rxjs_1 = require("rxjs");
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var effects_1 = require("@ngrx/effects");
var property_actions_1 = require("../_actions/property.actions");
var PropertyEffects = /** @class */ (function () {
    function PropertyEffects(actions$, propertiesService, store) {
        var _this = this;
        this.actions$ = actions$;
        this.propertiesService = propertiesService;
        this.store = store;
        this.showPageLoadingDistpatcher = new property_actions_1.PropertiesPageToggleLoading({ isLoading: true });
        this.showLoadingDistpatcher = new property_actions_1.PropertiesPageToggleLoading({ isLoading: true });
        this.hideActionLoadingDistpatcher = new property_actions_1.PropertiesPageToggleLoading({ isLoading: false });
        this.loadPropertiesPage$ = this.actions$.pipe(effects_1.ofType(property_actions_1.PropertyActionTypes.PropertiesPageRequested), operators_1.mergeMap(function (_a) {
            var payload = _a.payload;
            _this.store.dispatch(_this.showPageLoadingDistpatcher);
            var requestToServer = _this.propertiesService.findProperties(payload.page);
            var lastQuery = rxjs_1.of(payload.page);
            return rxjs_1.forkJoin([requestToServer, lastQuery]);
        }), operators_1.map(function (response) {
            var result = response[0];
            var lastQuery = response[1];
            return new property_actions_1.PropertiesPageLoaded({
                properties: result.items,
                totalCount: result.totalCount,
                page: lastQuery
            });
        }));
        this.deleteproperty$ = this.actions$.pipe(effects_1.ofType(property_actions_1.PropertyActionTypes.OnePropertyDeleted), operators_1.mergeMap(function (_a) {
            var payload = _a.payload;
            _this.store.dispatch(_this.showLoadingDistpatcher);
            return _this.propertiesService.deleteProperty(payload.id);
        }), operators_1.map(function () {
            return _this.hideActionLoadingDistpatcher;
        }));
        this.deleteProperties$ = this.actions$.pipe(effects_1.ofType(property_actions_1.PropertyActionTypes.ManyPropertiesDeleted), operators_1.mergeMap(function (_a) {
            var payload = _a.payload;
            _this.store.dispatch(_this.showLoadingDistpatcher);
            return _this.propertiesService.deleteProperties(payload.ids);
        }), operators_1.map(function () {
            return _this.hideActionLoadingDistpatcher;
        }));
        /*@Effect()
        updatePropertiesStatus$: Observable<PropertiesPageToggleLoading> = this.actions$.pipe(
          ofType<PropertiesStatusUpdated>(PropertyActionTypes.PropertiesStatusUpdated),
          mergeMap(({ payload }) => {
            this.store.dispatch(this.showLoadingDistpatcher);
            return this.propertiesService.updateStatusForProperty(payload.properties, payload.status);
          }),
          map(() => {
            return this.hideActionLoadingDistpatcher;
          }),
        );*/
        this.updateProperty$ = this.actions$.pipe(effects_1.ofType(property_actions_1.PropertyActionTypes.PropertyUpdated), operators_1.mergeMap(function (_a) {
            var payload = _a.payload;
            _this.store.dispatch(_this.showLoadingDistpatcher);
            return _this.propertiesService.updateProperty(payload.property);
        }), operators_1.map(function () {
            return _this.hideActionLoadingDistpatcher;
        }));
        this.createProperty$ = this.actions$.pipe(effects_1.ofType(property_actions_1.PropertyActionTypes.PropertyOnServerCreated), operators_1.mergeMap(function (_a) {
            var payload = _a.payload;
            _this.store.dispatch(_this.showLoadingDistpatcher);
            return _this.propertiesService.createProperty(payload.property).pipe(operators_1.tap(function (res) {
                _this.store.dispatch(new property_actions_1.PropertyCreated({ property: res }));
            }));
        }), operators_1.map(function () {
            return _this.hideActionLoadingDistpatcher;
        }));
    }
    __decorate([
        effects_1.Effect()
    ], PropertyEffects.prototype, "loadPropertiesPage$");
    __decorate([
        effects_1.Effect()
    ], PropertyEffects.prototype, "deleteproperty$");
    __decorate([
        effects_1.Effect()
    ], PropertyEffects.prototype, "deleteProperties$");
    __decorate([
        effects_1.Effect()
    ], PropertyEffects.prototype, "updateProperty$");
    __decorate([
        effects_1.Effect()
    ], PropertyEffects.prototype, "createProperty$");
    PropertyEffects = __decorate([
        core_1.Injectable()
    ], PropertyEffects);
    return PropertyEffects;
}());
exports.PropertyEffects = PropertyEffects;

//# sourceMappingURL=property.effects.js.map
