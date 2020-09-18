"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var store_1 = require("@ngrx/store");
var auth_1 = require("../../../../../core/auth");
var UserProfile4Component = /** @class */ (function () {
    function UserProfile4Component(store) {
        this.store = store;
        this.avatar = true;
        this.greeting = true;
    }
    UserProfile4Component.prototype.ngOnInit = function () {
        this.user$ = this.store.pipe(store_1.select(auth_1.currentUser));
    };
    UserProfile4Component.prototype.logout = function () {
        this.store.dispatch(new auth_1.Logout());
    };
    __decorate([
        core_1.Input()
    ], UserProfile4Component.prototype, "avatar");
    __decorate([
        core_1.Input()
    ], UserProfile4Component.prototype, "greeting");
    __decorate([
        core_1.Input()
    ], UserProfile4Component.prototype, "badge");
    __decorate([
        core_1.Input()
    ], UserProfile4Component.prototype, "icon");
    UserProfile4Component = __decorate([
        core_1.Component({
            selector: 'app-user-profile4',
            templateUrl: './user-profile4.component.html'
        })
    ], UserProfile4Component);
    return UserProfile4Component;
}());
exports.UserProfile4Component = UserProfile4Component;

//# sourceMappingURL=user-profile4.component.js.map
