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
var HeaderDirective = /** @class */ (function () {
    function HeaderDirective(el) {
        this.el = el;
        this.options = {};
    }
    HeaderDirective.prototype.ngAfterViewInit = function () {
        this.setupOptions();
        var header = new KTHeader(this.el.nativeElement, this.options);
    };
    HeaderDirective.prototype.setupOptions = function () {
        this.options = {
            classic: {
                desktop: true,
                mobile: false
            }
        };
        if (this.el.nativeElement.getAttribute('data-header-minimize') === '1') {
            objectPath.set(this.options, 'minimize', {
                desktop: {
                    on: 'header-minimize'
                },
                mobile: {
                    on: 'header-minimize'
                }
            });
            objectPath.set(this.options, 'offset', {
                desktop: 200,
                mobile: 150
            });
        }
    };
    __decorate([
        core_1.Input()
    ], HeaderDirective.prototype, "options");
    HeaderDirective = __decorate([
        core_1.Directive({
            selector: '[appHeader]',
            exportAs: 'appHeader'
        })
    ], HeaderDirective);
    return HeaderDirective;
}());
exports.HeaderDirective = HeaderDirective;

//# sourceMappingURL=header.directive.js.map
