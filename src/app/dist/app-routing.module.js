"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var base_component_1 = require("./views/theme/base/base.component");
var auth_1 = require("./core/auth");
var routes = [
    { path: 'auth', loadChildren: function () { return Promise.resolve().then(function () { return require('./views/pages/auth/auth.module'); }).then(function (m) { return m.AuthModule; }); } },
    { path: 'error', loadChildren: function () { return Promise.resolve().then(function () { return require('./views/pages/error/error.module'); }).then(function (m) { return m.ErrorModule; }); } },
    {
        path: '',
        component: base_component_1.BaseComponent,
        canActivate: [auth_1.AuthGuard],
        children: [
            {
                path: 'dashboard',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./views/pages/dashboard/dashboard.module'); }).then(function (m) { return m.DashboardModule; }); }
            },
            {
                path: 'mail',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./views/pages/apps/mail/mail.module'); }).then(function (m) { return m.MailModule; }); }
            },
            {
                path: 'ecommerce',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./views/pages/apps/e-commerce/e-commerce.module'); }).then(function (m) { return m.ECommerceModule; }); }
            },
            {
                path: 'ngbootstrap',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./views/pages/ngbootstrap/ngbootstrap.module'); }).then(function (m) { return m.NgbootstrapModule; }); }
            },
            {
                path: 'material',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./views/pages/material/material.module'); }).then(function (m) { return m.MaterialModule; }); }
            },
            {
                path: 'user-management',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./views/pages/user-management/user-management.module'); }).then(function (m) { return m.UserManagementModule; }); }
            },
            {
                path: 'wizard',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./views/pages/wizard/wizard.module'); }).then(function (m) { return m.WizardModule; }); }
            },
            {
                path: 'builder',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./views/theme/content/builder/builder.module'); }).then(function (m) { return m.BuilderModule; }); }
            },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
        ]
    },
    { path: '**', redirectTo: 'error/403', pathMatch: 'full' },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule.forRoot(routes),
            ],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;

//# sourceMappingURL=app-routing.module.js.map
