"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var OffcanvasDirective = /** @class */ (function () {
    function OffcanvasDirective(el) {
        this.el = el;
    }
    OffcanvasDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.offcanvas = new KTOffcanvas(_this.el.nativeElement, _this.options);
        });
    };
    OffcanvasDirective.prototype.getOffcanvas = function () {
        return this.offcanvas;
    };
    __decorate([
        core_1.Input()
    ], OffcanvasDirective.prototype, "options");
    OffcanvasDirective = __decorate([
        core_1.Directive({
            selector: '[appOffcanvas]',
            exportAs: 'appOffcanvas'
        })
    ], OffcanvasDirective);
    return OffcanvasDirective;
}());
exports.OffcanvasDirective = OffcanvasDirective;

//# sourceMappingURL=offcanvas.directive.js.map
