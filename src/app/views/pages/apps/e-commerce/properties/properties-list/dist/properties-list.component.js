"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var paginator_1 = require("@angular/material/paginator");
var collections_1 = require("@angular/cdk/collections");
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var store_1 = require("@ngrx/store");
var crud_1 = require("../../../../../../core/_base/crud");
var e_commerce_1 = require("../../../../../../core/e-commerce");
var PropertiesListComponent = /** @class */ (function () {
    function PropertiesListComponent(dialog, activatedRoute, router, subheaderService, layoutUtilsService, store) {
        this.dialog = dialog;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.subheaderService = subheaderService;
        this.layoutUtilsService = layoutUtilsService;
        this.store = store;
        this.displayedColumns = ['select', 'id', 'title', 'type', 'city', 'color', 'price', 'condition', 'status', 'actions'];
        this.filterStatus = '';
        this.filterCondition = '';
        this.selection = new collections_1.SelectionModel(true, []);
        this.propertiesResult = [];
        this.subscriptions = [];
    }
    PropertiesListComponent.prototype.ngOnInit = function () {
        var _this = this;
        var sortSubscription = this.sort.sortChange.subscribe(function () { return (_this.paginator.pageIndex = 0); });
        this.subscriptions.push(sortSubscription);
        var paginatorSubscriptions = rxjs_1.merge(this.sort.sortChange, this.paginator.page)
            .pipe(operators_1.tap(function () { return _this.loadPropertiesList(); }))
            .subscribe();
        this.subscriptions.push(paginatorSubscriptions);
        var searchSubscription = rxjs_1.fromEvent(this.searchInput.nativeElement, 'keyup')
            .pipe(operators_1.debounceTime(150), operators_1.distinctUntilChanged(), operators_1.tap(function () {
            _this.paginator.pageIndex = 0;
            _this.loadPropertiesList();
        }))
            .subscribe();
        this.subscriptions.push(searchSubscription);
        this.subheaderService.setTitle('Properties');
        this.dataSource = new e_commerce_1.PropertiesDataSource(this.store);
        var entitiesSubscription = this.dataSource.entitySubject.pipe(operators_1.skip(1), operators_1.distinctUntilChanged()).subscribe(function (res) {
            _this.propertiesResult = res;
        });
        this.subscriptions.push(entitiesSubscription);
        var lastQuerySubscription = this.store.pipe(store_1.select(e_commerce_1.selectProductsPageLastQuery))
            .subscribe(function (res) { return _this.lastQuery = res; });
        this.subscriptions.push(lastQuerySubscription);
        var routeSubscription = this.activatedRoute.queryParams.subscribe(function (params) {
            if (params.id) {
                _this.restoreState(_this.lastQuery, +params.id);
            }
            rxjs_1.of(undefined).pipe(operators_1.delay(1000)).subscribe(function () {
                _this.loadPropertiesList();
            });
        });
        this.subscriptions.push(routeSubscription);
    };
    PropertiesListComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (el) { return el.unsubscribe(); });
    };
    PropertiesListComponent.prototype.loadPropertiesList = function () {
        this.selection.clear();
        var queryParams = new crud_1.QueryParamsModel(this.filterConfiguration(), this.sort.direction, this.sort.active, this.paginator.pageIndex, this.paginator.pageSize);
        this.store.dispatch(new e_commerce_1.PropertiesPageRequested({ page: queryParams }));
        this.selection.clear();
    };
    PropertiesListComponent.prototype.filterConfiguration = function () {
        var filter = {};
        filter.title = this.searchInput.nativeElement.value;
        return filter;
    };
    PropertiesListComponent.prototype.restoreState = function (queryParams, id) {
        if (!queryParams.filter) {
            return;
        }
        if ('condition' in queryParams.filter) {
            this.filterCondition = queryParams.filter.condition.toString();
        }
        if ('status' in queryParams.filter) {
            this.filterStatus = queryParams.filter.status.toString();
        }
        if (queryParams.filter.model) {
            this.searchInput.nativeElement.value = queryParams.filter.model;
        }
    };
    PropertiesListComponent.prototype.deleteProduct = function (_item) {
        var _this = this;
        var _title = 'Property Delete';
        var _description = 'Are you sure to permanently delete this property?';
        var _waitDesciption = 'Property is deleting...';
        var _deleteMessage = "Property has been deleted";
        var dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
        dialogRef.afterClosed().subscribe(function (res) {
            if (!res) {
                return;
            }
            _this.store.dispatch(new e_commerce_1.OnePropertyDeleted({ id: _item.id }));
            _this.layoutUtilsService.showActionNotification(_deleteMessage, crud_1.MessageType.Delete);
        });
    };
    PropertiesListComponent.prototype.deleteProducts = function () {
        var _this = this;
        var _title = 'Properties Delete';
        var _description = 'Are you sure to permanently delete selected properties?';
        var _waitDesciption = 'Properties are deleting...';
        var _deleteMessage = 'Selected properties have been deleted';
        var dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
        dialogRef.afterClosed().subscribe(function (res) {
            if (!res) {
                return;
            }
            var idsForDeletion = [];
            // tslint:disable-next-line:prefer-for-of
            for (var i = 0; i < _this.selection.selected.length; i++) {
                idsForDeletion.push(_this.selection.selected[i].id);
            }
            _this.store.dispatch(new e_commerce_1.ManyPropertiesDeleted({ ids: idsForDeletion }));
            _this.layoutUtilsService.showActionNotification(_deleteMessage, crud_1.MessageType.Delete);
            _this.selection.clear();
        });
    };
    PropertiesListComponent.prototype.fetchProducts = function () {
        // tslint:disable-next-line:prefer-const
        var messages = [];
        this.selection.selected.forEach(function (elem) {
            messages.push({
                text: elem.desc + " " + elem.neighborhood,
                id: elem.id,
                status: elem.title
            });
        });
        this.layoutUtilsService.fetchElements(messages);
    };
    PropertiesListComponent.prototype.updateStatusForProducts = function () {
        var _this = this;
        var _title = 'Update status for selected properties';
        var _updateMessage = 'Status has been updated for selected properties';
        var _statuses = [{ value: 0, text: 'Selling' }, { value: 1, text: 'Sold' }];
        var _messages = [];
        /*this.selection.selected.forEach(elem => {
            _messages.push({
                // text: `${elem.manufacture} ${elem.model} ${elem.modelYear}`,
                // id: elem.VINCode,
                // status: elem.status,
                // statusTitle: this.getItemStatusString(elem.status),
                // statusCssClass: this.getItemCssClassByStatus(elem.status)
            });
        });*/
        var dialogRef = this.layoutUtilsService.updateStatusForEntities(_title, _statuses, _messages);
        dialogRef.afterClosed().subscribe(function (res) {
            if (!res) {
                _this.selection.clear();
                return;
            }
            _this.store.dispatch(new e_commerce_1.PropertiesStatusUpdated({
                status: +res,
                properties: _this.selection.selected
            }));
            _this.layoutUtilsService.showActionNotification(_updateMessage, crud_1.MessageType.Update);
            _this.selection.clear();
        });
    };
    PropertiesListComponent.prototype.editProduct = function (id) {
        this.router.navigate(['../properties/edit', id], { relativeTo: this.activatedRoute });
    };
    PropertiesListComponent.prototype.createProperties = function () {
        this.router.navigateByUrl('/ecommerce/properties/add');
    };
    PropertiesListComponent.prototype.isAllSelected = function () {
        var numSelected = this.selection.selected.length;
        var numRows = this.propertiesResult.length;
        return numSelected === numRows;
    };
    PropertiesListComponent.prototype.masterToggle = function () {
        var _this = this;
        if (this.isAllSelected()) {
            this.selection.clear();
        }
        else {
            this.propertiesResult.forEach(function (row) { return _this.selection.select(row); });
        }
    };
    PropertiesListComponent.prototype.getItemStatusString = function (status) {
        if (status === void 0) { status = 0; }
        switch (status) {
            case 0:
                return 'Selling';
            case 1:
                return 'Sold';
        }
        return '';
    };
    PropertiesListComponent.prototype.getItemCssClassByStatus = function (status) {
        if (status === void 0) { status = 0; }
        switch (status) {
            case 0:
                return 'success';
            case 1:
                return 'metal';
        }
        return '';
    };
    PropertiesListComponent.prototype.getItemConditionString = function (condition) {
        if (condition === void 0) { condition = 0; }
        switch (condition) {
            case 0:
                return 'New';
            case 1:
                return 'Used';
        }
        return '';
    };
    PropertiesListComponent.prototype.getItemCssClassByCondition = function (condition) {
        if (condition === void 0) { condition = 0; }
        switch (condition) {
            case 0:
                return 'danger';
            case 1:
                return 'primary';
        }
        return '';
    };
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator, { static: true })
    ], PropertiesListComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild('sort1', { static: true })
    ], PropertiesListComponent.prototype, "sort");
    __decorate([
        core_1.ViewChild('searchInput', { static: true })
    ], PropertiesListComponent.prototype, "searchInput");
    PropertiesListComponent = __decorate([
        core_1.Component({
            selector: 'app-properties-list',
            templateUrl: './properties-list.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], PropertiesListComponent);
    return PropertiesListComponent;
}());
exports.PropertiesListComponent = PropertiesListComponent;

//# sourceMappingURL=properties-list.component.js.map
