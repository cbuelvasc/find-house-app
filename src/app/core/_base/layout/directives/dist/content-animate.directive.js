"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
var router_1 = require("@angular/router");
var ContentAnimateDirective = /** @class */ (function () {
    function ContentAnimateDirective(el, router, animationBuilder) {
        this.el = el;
        this.router = router;
        this.animationBuilder = animationBuilder;
    }
    ContentAnimateDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.initAnimate();
        this.events = this.router.events.subscribe(function (event) {
            if (event instanceof router_1.NavigationEnd) {
                _this.player.play();
            }
        });
    };
    ContentAnimateDirective.prototype.ngOnDestroy = function () {
        this.events.unsubscribe();
        this.player.destroy();
    };
    ContentAnimateDirective.prototype.initAnimate = function () {
        this.player = this.animationBuilder
            .build([
            animations_1.style({
                transform: 'translateY(-3%)',
                opacity: 0,
                position: 'static'
            }),
            animations_1.animate('0.5s ease-in-out', animations_1.style({ transform: 'translateY(0%)', opacity: 1 }))
        ])
            .create(this.el.nativeElement);
    };
    ContentAnimateDirective = __decorate([
        core_1.Directive({
            selector: '[appContentAnimate]'
        })
    ], ContentAnimateDirective);
    return ContentAnimateDirective;
}());
exports.ContentAnimateDirective = ContentAnimateDirective;

//# sourceMappingURL=content-animate.directive.js.map
