"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var PortletBodyComponent = /** @class */ (function () {
    function PortletBodyComponent() {
        this.classList = 'card-body';
    }
    PortletBodyComponent.prototype.ngOnInit = function () {
        if (this["class"]) {
            this.classList += ' ' + this["class"];
        }
    };
    __decorate([
        core_1.HostBinding('class')
    ], PortletBodyComponent.prototype, "classList");
    __decorate([
        core_1.Input()
    ], PortletBodyComponent.prototype, "class");
    PortletBodyComponent = __decorate([
        core_1.Component({
            selector: 'app-portlet-body',
            template: "<ng-content></ng-content>"
        })
    ], PortletBodyComponent);
    return PortletBodyComponent;
}());
exports.PortletBodyComponent = PortletBodyComponent;

//# sourceMappingURL=portlet-body.component.js.map
