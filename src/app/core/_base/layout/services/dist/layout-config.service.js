"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var objectPath = require("object-path");
var lodash_1 = require("lodash");
var localStorageKey = 'layoutConfig';
var LayoutConfigService = /** @class */ (function () {
    function LayoutConfigService() {
        this.onConfigUpdated$ = new rxjs_1.Subject();
    }
    LayoutConfigService.prototype.saveConfig = function (layoutConfig) {
        if (layoutConfig) {
            localStorage.setItem(localStorageKey, JSON.stringify(layoutConfig));
        }
    };
    LayoutConfigService.prototype.getSavedConfig = function () {
        var config = localStorage.getItem(localStorageKey);
        try {
            return JSON.parse(config);
        }
        catch (e) {
        }
    };
    LayoutConfigService.prototype.resetConfig = function () {
        localStorage.removeItem('layoutConfig');
    };
    LayoutConfigService.prototype.getConfig = function (path) {
        this.layoutConfig = this.getSavedConfig();
        if (path) {
            return objectPath.get(this.layoutConfig, path);
        }
        return this.layoutConfig;
    };
    LayoutConfigService.prototype.setConfig = function (value, save) {
        this.layoutConfig = lodash_1.merge(this.layoutConfig, value);
        if (save) {
            this.saveConfig(this.layoutConfig);
        }
        this.onConfigUpdated$.next(this.layoutConfig);
    };
    LayoutConfigService.prototype.getLogo = function () {
        var menuAsideLeftSkin = objectPath.get(this.layoutConfig, 'brand.self.theme');
        // set brand logo
        var logoObject = objectPath.get(this.layoutConfig, 'self.logo');
        var logo;
        if (typeof logoObject === 'string') {
            logo = logoObject;
        }
        if (typeof logoObject === 'object') {
            logo = objectPath.get(logoObject, menuAsideLeftSkin + '');
        }
        if (typeof logo === 'undefined') {
            try {
                var logos = objectPath.get(this.layoutConfig, 'self.logo');
                logo = logos[Object.keys(logos)[0]];
            }
            catch (e) {
            }
        }
        return logo;
    };
    LayoutConfigService.prototype.getStickyLogo = function () {
        var logo = objectPath.get(this.layoutConfig, 'self.logo.sticky');
        if (typeof logo === 'undefined') {
            logo = this.getLogo();
        }
        return logo + '';
    };
    LayoutConfigService.prototype.loadConfigs = function (config) {
        this.layoutConfig = this.getSavedConfig();
        if (!this.layoutConfig || objectPath.get(this.layoutConfig, 'demo') !== config.demo) {
            this.layoutConfig = config;
        }
        this.saveConfig(this.layoutConfig);
    };
    LayoutConfigService.prototype.reloadConfigs = function () {
        this.layoutConfig = this.getSavedConfig();
        this.onConfigUpdated$.next(this.layoutConfig);
        return this.layoutConfig;
    };
    LayoutConfigService = __decorate([
        core_1.Injectable()
    ], LayoutConfigService);
    return LayoutConfigService;
}());
exports.LayoutConfigService = LayoutConfigService;

//# sourceMappingURL=layout-config.service.js.map
