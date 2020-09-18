"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
/**
 * Listen Tab click
 */
var TabClickEventDirective = /** @class */ (function () {
    function TabClickEventDirective(el, render) {
        this.el = el;
        this.render = render;
    }
    TabClickEventDirective.prototype.onClick = function (target) {
        var parent = target.closest('[role="tablist"]');
        var activeLink = parent.querySelector('[role="tab"].active');
        if (activeLink) {
            this.render.removeClass(activeLink, 'active');
        }
        var link = target.closest('[role="tab"]');
        if (link) {
            this.render.addClass(link, 'active');
        }
    };
    __decorate([
        core_1.HostListener('click', ['$event.target'])
    ], TabClickEventDirective.prototype, "onClick");
    TabClickEventDirective = __decorate([
        core_1.Directive({
            selector: '[appTabClickEvent]'
        })
    ], TabClickEventDirective);
    return TabClickEventDirective;
}());
exports.TabClickEventDirective = TabClickEventDirective;

//# sourceMappingURL=tab-click-event.directive.js.map
