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
var SplashScreenService = /** @class */ (function () {
    function SplashScreenService(animationBuilder) {
        this.animationBuilder = animationBuilder;
    }
    SplashScreenService.prototype.init = function (element) {
        this.el = element;
    };
    SplashScreenService.prototype.hide = function () {
        var _this = this;
        if (this.stopped) {
            return;
        }
        var player = this.animationBuilder.build([
            animations_1.style({ opacity: '1' }),
            animations_1.animate(800, animations_1.style({ opacity: '0' }))
        ]).create(this.el.nativeElement);
        player.onDone(function () {
            if (typeof _this.el.nativeElement.remove === 'function') {
                _this.el.nativeElement.remove();
            }
            else {
                _this.el.nativeElement.style.display = 'none';
            }
            _this.stopped = true;
        });
        setTimeout(function () { return player.play(); }, 300);
    };
    SplashScreenService = __decorate([
        core_1.Injectable()
    ], SplashScreenService);
    return SplashScreenService;
}());
exports.SplashScreenService = SplashScreenService;

//# sourceMappingURL=splash-screen.service.js.map
