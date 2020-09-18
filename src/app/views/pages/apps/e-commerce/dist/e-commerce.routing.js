"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
var e_commerce_component_1 = require("./e-commerce.component");
var customers_list_component_1 = require("./customers/customers-list/customers-list.component");
var orders_list_component_1 = require("./orders/orders-list/orders-list.component");
var products_list_component_1 = require("./products/products-list/products-list.component");
var product_edit_component_1 = require("./products/product-edit/product-edit.component");
var properties_list_component_1 = require("./properties/properties-list/properties-list.component");
var module_guard_1 = require("./../../../../core/auth/_guards/module.guard");
var routes = [
    {
        path: '',
        component: e_commerce_component_1.ECommerceComponent,
        canActivate: [module_guard_1.ModuleGuard],
        data: { moduleName: 'ecommerce' },
        children: [
            {
                path: '',
                redirectTo: 'customers',
                pathMatch: 'full'
            },
            {
                path: 'customers',
                component: customers_list_component_1.CustomersListComponent
            },
            {
                path: 'orders',
                component: orders_list_component_1.OrdersListComponent
            },
            {
                path: 'products',
                component: products_list_component_1.ProductsListComponent
            },
            {
                path: 'products/add',
                component: product_edit_component_1.ProductEditComponent
            },
            {
                path: 'products/edit',
                component: product_edit_component_1.ProductEditComponent
            },
            {
                path: 'products/edit/:id',
                component: product_edit_component_1.ProductEditComponent
            },
            {
                path: 'properties',
                component: properties_list_component_1.PropertiesListComponent
            }
        ]
    }
];
var ECommerceRoutingModule = /** @class */ (function () {
    function ECommerceRoutingModule() {
    }
    ECommerceRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], ECommerceRoutingModule);
    return ECommerceRoutingModule;
}());
exports.ECommerceRoutingModule = ECommerceRoutingModule;

//# sourceMappingURL=e-commerce.routing.js.map
