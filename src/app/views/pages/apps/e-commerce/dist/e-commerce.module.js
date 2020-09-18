"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
// Angular
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
// Fake API Angular-in-memory
var angular_in_memory_web_api_1 = require("angular-in-memory-web-api");
// Translate Module
var core_2 = require("@ngx-translate/core");
// NGRX
var store_1 = require("@ngrx/store");
var effects_1 = require("@ngrx/effects");
// UI
var partials_module_1 = require("../../../partials/partials.module");
// Core
var layout_1 = require("../../../../core/_base/layout");
// Auth
var auth_1 = require("../../../../core/auth");
// Core => Services
var e_commerce_1 = require("../../../../core/e-commerce");
// Core => Utils
var crud_1 = require("../../../../core/_base/crud");
// Shared
var crud_2 = require("../../../partials/content/crud");
// Components
var e_commerce_component_1 = require("./e-commerce.component");
// Customers
var customers_list_component_1 = require("./customers/customers-list/customers-list.component");
var customer_edit_dialog_component_1 = require("./customers/customer-edit/customer-edit.dialog.component");
// Products
var products_list_component_1 = require("./products/products-list/products-list.component");
var product_edit_component_1 = require("./products/product-edit/product-edit.component");
var remarks_list_component_1 = require("./products/_subs/remarks/remarks-list/remarks-list.component");
var specifications_list_component_1 = require("./products/_subs/specifications/specifications-list/specifications-list.component");
var specification_edit_dialog_component_1 = require("./products/_subs/specifications/specification-edit/specification-edit-dialog.component");
// Orders
var orders_list_component_1 = require("./orders/orders-list/orders-list.component");
var order_edit_component_1 = require("./orders/order-edit/order-edit.component");
// Material
var input_1 = require("@angular/material/input");
var paginator_1 = require("@angular/material/paginator");
var progress_spinner_1 = require("@angular/material/progress-spinner");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var select_1 = require("@angular/material/select");
var menu_1 = require("@angular/material/menu");
var progress_bar_1 = require("@angular/material/progress-bar");
var button_1 = require("@angular/material/button");
var checkbox_1 = require("@angular/material/checkbox");
var dialog_1 = require("@angular/material/dialog");
var tabs_1 = require("@angular/material/tabs");
var core_3 = require("@angular/material/core");
var card_1 = require("@angular/material/card");
var radio_1 = require("@angular/material/radio");
var icon_1 = require("@angular/material/icon");
var datepicker_1 = require("@angular/material/datepicker");
var autocomplete_1 = require("@angular/material/autocomplete");
var snack_bar_1 = require("@angular/material/snack-bar");
var tooltip_1 = require("@angular/material/tooltip");
var environment_1 = require("../../../../../environments/environment");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var ngx_permissions_1 = require("ngx-permissions");
var properties_list_component_1 = require("./properties/properties-list/properties-list.component");
// tslint:disable-next-line:class-name
var routes = [
    {
        path: '',
        component: e_commerce_component_1.ECommerceComponent,
        // canActivate: [ModuleGuard],
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
var ECommerceModule = /** @class */ (function () {
    function ECommerceModule() {
    }
    ECommerceModule = __decorate([
        core_1.NgModule({
            imports: [
                dialog_1.MatDialogModule,
                common_1.CommonModule,
                http_1.HttpClientModule,
                partials_module_1.PartialsModule,
                ngx_permissions_1.NgxPermissionsModule.forChild(),
                router_1.RouterModule.forChild(routes),
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                core_2.TranslateModule.forChild(),
                button_1.MatButtonModule,
                menu_1.MatMenuModule,
                select_1.MatSelectModule,
                input_1.MatInputModule,
                table_1.MatTableModule,
                autocomplete_1.MatAutocompleteModule,
                radio_1.MatRadioModule,
                icon_1.MatIconModule,
                core_3.MatNativeDateModule,
                progress_bar_1.MatProgressBarModule,
                datepicker_1.MatDatepickerModule,
                card_1.MatCardModule,
                paginator_1.MatPaginatorModule,
                sort_1.MatSortModule,
                checkbox_1.MatCheckboxModule,
                progress_spinner_1.MatProgressSpinnerModule,
                snack_bar_1.MatSnackBarModule,
                tabs_1.MatTabsModule,
                tooltip_1.MatTooltipModule,
                ng_bootstrap_1.NgbProgressbarModule,
                environment_1.environment.isMockEnabled ? angular_in_memory_web_api_1.HttpClientInMemoryWebApiModule.forFeature(layout_1.FakeApiService, {
                    passThruUnknownUrl: true,
                    dataEncapsulation: false
                }) : [],
                store_1.StoreModule.forFeature('products', e_commerce_1.productsReducer),
                effects_1.EffectsModule.forFeature([e_commerce_1.ProductEffects]),
                store_1.StoreModule.forFeature('properties', e_commerce_1.propertiesReducer),
                effects_1.EffectsModule.forFeature([e_commerce_1.PropertyEffects]),
                store_1.StoreModule.forFeature('customers', e_commerce_1.customersReducer),
                effects_1.EffectsModule.forFeature([e_commerce_1.CustomerEffects]),
                store_1.StoreModule.forFeature('productRemarks', e_commerce_1.productRemarksReducer),
                effects_1.EffectsModule.forFeature([e_commerce_1.ProductRemarkEffects]),
                store_1.StoreModule.forFeature('productSpecifications', e_commerce_1.productSpecificationsReducer),
                effects_1.EffectsModule.forFeature([e_commerce_1.ProductSpecificationEffects]),
            ],
            providers: [
                auth_1.ModuleGuard,
                crud_1.InterceptService,
                {
                    provide: http_1.HTTP_INTERCEPTORS,
                    useClass: crud_1.InterceptService,
                    multi: true
                },
                {
                    provide: dialog_1.MAT_DIALOG_DEFAULT_OPTIONS,
                    useValue: {
                        hasBackdrop: true,
                        panelClass: 'mat-dialog-container-wrapper',
                        height: 'auto',
                        width: '900px'
                    }
                },
                crud_1.TypesUtilsService,
                crud_1.LayoutUtilsService,
                crud_1.HttpUtilsService,
                e_commerce_1.CustomersService,
                e_commerce_1.ProductRemarksService,
                e_commerce_1.ProductSpecificationsService,
                e_commerce_1.ProductsService,
                e_commerce_1.PropertiesService,
                crud_1.TypesUtilsService,
                crud_1.LayoutUtilsService
            ],
            entryComponents: [
                crud_2.ActionNotificationComponent,
                customer_edit_dialog_component_1.CustomerEditDialogComponent,
                crud_2.DeleteEntityDialogComponent,
                crud_2.FetchEntityDialogComponent,
                crud_2.UpdateStatusDialogComponent,
                specification_edit_dialog_component_1.SpecificationEditDialogComponent
            ],
            declarations: [
                e_commerce_component_1.ECommerceComponent,
                // Customers
                customers_list_component_1.CustomersListComponent,
                customer_edit_dialog_component_1.CustomerEditDialogComponent,
                // Orders
                orders_list_component_1.OrdersListComponent,
                order_edit_component_1.OrderEditComponent,
                // Products
                products_list_component_1.ProductsListComponent,
                product_edit_component_1.ProductEditComponent,
                // Properties
                properties_list_component_1.PropertiesListComponent,
                remarks_list_component_1.RemarksListComponent,
                specifications_list_component_1.SpecificationsListComponent,
                specification_edit_dialog_component_1.SpecificationEditDialogComponent
            ]
        })
    ], ECommerceModule);
    return ECommerceModule;
}());
exports.ECommerceModule = ECommerceModule;

//# sourceMappingURL=e-commerce.module.js.map
