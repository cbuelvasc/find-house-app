"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var en_1 = require("./core/_config/i18n/en");
var ch_1 = require("./core/_config/i18n/ch");
var es_1 = require("./core/_config/i18n/es");
var jp_1 = require("./core/_config/i18n/jp");
var de_1 = require("./core/_config/i18n/de");
var fr_1 = require("./core/_config/i18n/fr");
var AppComponent = /** @class */ (function () {
    function AppComponent(translationService, router, layoutConfigService, splashScreenService) {
        this.translationService = translationService;
        this.router = router;
        this.layoutConfigService = layoutConfigService;
        this.splashScreenService = splashScreenService;
        this.title = 'Find House';
        this.unsubscribe = [];
        this.translationService.loadTranslations(en_1.locale, ch_1.locale, es_1.locale, jp_1.locale, de_1.locale, fr_1.locale);
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loader = this.layoutConfigService.getConfig('page-loader.type');
        var routerSubscription = this.router.events.subscribe(function (event) {
            if (event instanceof router_1.NavigationEnd) {
                _this.splashScreenService.hide();
                window.scrollTo(0, 0);
                setTimeout(function () {
                    document.body.classList.add('page-loaded');
                }, 500);
            }
        });
        this.unsubscribe.push(routerSubscription);
    };
    AppComponent.prototype.ngOnDestroy = function () {
        this.unsubscribe.forEach(function (sb) { return sb.unsubscribe(); });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;

//# sourceMappingURL=app.component.js.map
