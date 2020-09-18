"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var rxjs_1 = require("rxjs");
var lodash_1 = require("lodash");
var store_1 = require("@ngrx/store");
var auth_1 = require("../../../../../core/auth");
var operators_1 = require("rxjs/operators");
var RoleEditDialogComponent = /** @class */ (function () {
    function RoleEditDialogComponent(dialogRef, data, store) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.store = store;
        this.hasFormErrors = false;
        this.viewLoading = false;
        this.loadingAfterSubmit = false;
        this.rolePermissions = [];
    }
    RoleEditDialogComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.data.roleId) {
            this.role$ = this.store.pipe(store_1.select(auth_1.selectRoleById(this.data.roleId)));
        }
        else {
            var newRole = new auth_1.Role();
            newRole.clear();
            this.role$ = rxjs_1.of(newRole);
        }
        this.role$.subscribe(function (res) {
            if (!res) {
                return;
            }
            _this.role = new auth_1.Role();
            _this.role.id = res.id;
            _this.role.title = res.title;
            _this.role.permissions = res.permissions;
            _this.role.isCoreRole = res.isCoreRole;
            _this.allPermissions$ = _this.store.pipe(store_1.select(auth_1.selectAllPermissions));
            _this.loadPermissions();
        });
    };
    RoleEditDialogComponent.prototype.ngOnDestroy = function () {
        if (this.componentSubscriptions) {
            this.componentSubscriptions.unsubscribe();
        }
    };
    RoleEditDialogComponent.prototype.loadPermissions = function () {
        var _this = this;
        this.allPermissions$.subscribe(function (_allPermissions) {
            if (!_allPermissions) {
                return;
            }
            var mainPermissions = _allPermissions.filter(function (el) { return !el.parentId; });
            mainPermissions.forEach(function (element) {
                var hasUserPermission = _this.role.permissions.some(function (t) { return t === element.id; });
                var rootPermission = new auth_1.Permission();
                rootPermission.clear();
                rootPermission.isSelected = hasUserPermission;
                rootPermission._children = [];
                rootPermission.id = element.id;
                rootPermission.level = element.level;
                rootPermission.parentId = element.parentId;
                rootPermission.title = element.title;
                var children = _allPermissions.filter(function (el) { return el.parentId && el.parentId === element.id; });
                children.forEach(function (child) {
                    var hasUserChildPermission = _this.role.permissions.some(function (t) { return t === child.id; });
                    var childPermission = new auth_1.Permission();
                    childPermission.clear();
                    childPermission.isSelected = hasUserChildPermission;
                    childPermission._children = [];
                    childPermission.id = child.id;
                    childPermission.level = child.level;
                    childPermission.parentId = child.parentId;
                    childPermission.title = child.title;
                    rootPermission._children.push(childPermission);
                });
                _this.rolePermissions.push(rootPermission);
            });
        });
    };
    RoleEditDialogComponent.prototype.preparePermissionIds = function () {
        var result = [];
        lodash_1.each(this.rolePermissions, function (_root) {
            if (_root.isSelected) {
                result.push(_root.id);
                lodash_1.each(_root._children, function (_child) {
                    if (_child.isSelected) {
                        result.push(_child.id);
                    }
                });
            }
        });
        return result;
    };
    RoleEditDialogComponent.prototype.prepareRole = function () {
        var _role = new auth_1.Role();
        _role.id = this.role.id;
        _role.permissions = this.preparePermissionIds();
        // each(this.assignedRoles, (_role: Role) => _user.roles.push(_role.id));
        _role.title = this.role.title;
        _role.isCoreRole = this.role.isCoreRole;
        return _role;
    };
    RoleEditDialogComponent.prototype.onSubmit = function () {
        this.hasFormErrors = false;
        this.loadingAfterSubmit = false;
        /** check form */
        if (!this.isTitleValid()) {
            this.hasFormErrors = true;
            return;
        }
        var editedRole = this.prepareRole();
        if (editedRole.id) {
            this.updateRole(editedRole);
        }
        else {
            this.createRole(editedRole);
        }
    };
    RoleEditDialogComponent.prototype.updateRole = function (_role) {
        var _this = this;
        this.loadingAfterSubmit = true;
        this.viewLoading = true;
        /* Server loading imitation. Remove this on real code */
        var updateRole = {
            id: this.role.id,
            changes: _role
        };
        this.store.dispatch(new auth_1.RoleUpdated({
            partialrole: updateRole,
            role: _role
        }));
        rxjs_1.of(undefined).subscribe(function () {
            _this.viewLoading = false;
            _this.dialogRef.close({
                _role: _role,
                isEdit: true
            });
        }); // Remove this line
    };
    RoleEditDialogComponent.prototype.createRole = function (_role) {
        var _this = this;
        this.loadingAfterSubmit = true;
        this.viewLoading = true;
        this.store.dispatch(new auth_1.RoleOnServerCreated({ role: _role }));
        this.componentSubscriptions = this.store.pipe(operators_1.delay(1000), // Remove this line
        store_1.select(auth_1.selectLastCreatedRoleId)).subscribe(function (res) {
            if (!res) {
                return;
            }
            _this.viewLoading = false;
            _this.dialogRef.close({
                _role: _role,
                isEdit: false
            });
        });
    };
    RoleEditDialogComponent.prototype.onAlertClose = function ($event) {
        this.hasFormErrors = false;
    };
    RoleEditDialogComponent.prototype.isSelectedChanged = function ($event, permission) {
        if (permission._children.length === 0 && permission.isSelected) {
            var _root = lodash_1.find(this.rolePermissions, function (item) { return item.id === permission.parentId; });
            if (_root && !_root.isSelected) {
                _root.isSelected = true;
            }
            return;
        }
        if (permission._children.length === 0 && !permission.isSelected) {
            var _root = lodash_1.find(this.rolePermissions, function (item) { return item.id === permission.parentId; });
            if (_root && _root.isSelected) {
                if (!lodash_1.some(_root._children, function (item) { return item.isSelected === true; })) {
                    _root.isSelected = false;
                }
            }
            return;
        }
        if (permission._children.length > 0 && permission.isSelected) {
            lodash_1.each(permission._children, function (item) { return item.isSelected = true; });
            return;
        }
        if (permission._children.length > 0 && !permission.isSelected) {
            lodash_1.each(permission._children, function (item) {
                item.isSelected = false;
            });
            return;
        }
    };
    RoleEditDialogComponent.prototype.getTitle = function () {
        if (this.role && this.role.id) {
            return "Edit role '" + this.role.title + "'";
        }
        return 'New role';
    };
    RoleEditDialogComponent.prototype.isTitleValid = function () {
        return (this.role && this.role.title && this.role.title.length > 0);
    };
    RoleEditDialogComponent = __decorate([
        core_1.Component({
            selector: 'app-role-edit-dialog',
            templateUrl: './role-edit.dialog.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.Default
        }),
        __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], RoleEditDialogComponent);
    return RoleEditDialogComponent;
}());
exports.RoleEditDialogComponent = RoleEditDialogComponent;

//# sourceMappingURL=role-edit.dialog.component.js.map
