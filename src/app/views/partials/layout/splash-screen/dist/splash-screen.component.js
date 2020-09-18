"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var objectPath = require("object-path");
var SplashScreenComponent = /** @class */ (function () {
    function SplashScreenComponent(el, layoutConfigService, splashScreenService) {
        this.el = el;
        this.layoutConfigService = layoutConfigService;
        this.splashScreenService = splashScreenService;
    }
    SplashScreenComponent.prototype.ngOnInit = function () {
        var loaderConfig = this.layoutConfigService.getConfig('loader');
        this.loaderType = objectPath.get(loaderConfig, 'page-loader.type');
        this.splashScreenService.init(this.splashScreen);
    };
    __decorate([
        core_1.ViewChild('splashScreen', { static: true })
    ], SplashScreenComponent.prototype, "splashScreen");
    SplashScreenComponent = __decorate([
        core_1.Component({
            selector: 'app-splash-screen',
            templateUrl: './splash-screen.component.html',
            styleUrls: ['./splash-screen.component.scss']
        })
    ], SplashScreenComponent);
    return SplashScreenComponent;
}());
exports.SplashScreenComponent = SplashScreenComponent;

//# sourceMappingURL=splash-screen.component.js.map
