"use strict";
exports.__esModule = true;
// NGRX
var store_1 = require("@ngrx/store");
// Lodash
var lodash_1 = require("lodash");
// Selectors
var role_selectors_1 = require("./role.selectors");
var permission_selectors_1 = require("./permission.selectors");
exports.selectAuthState = function (state) { return state.auth; };
exports.isLoggedIn = store_1.createSelector(exports.selectAuthState, function (auth) { return auth.loggedIn; });
exports.isLoggedOut = store_1.createSelector(exports.isLoggedIn, function (loggedIn) { return !loggedIn; });
exports.currentAuthToken = store_1.createSelector(exports.selectAuthState, function (auth) { return auth.authToken; });
exports.isUserLoaded = store_1.createSelector(exports.selectAuthState, function (auth) { return auth.isUserLoaded; });
exports.currentUser = store_1.createSelector(exports.selectAuthState, function (auth) { return auth.user; });
exports.currentUserRoleIds = store_1.createSelector(exports.currentUser, function (user) {
    if (!user) {
        return [];
    }
    return user.roles;
});
exports.currentUserPermissionsIds = store_1.createSelector(exports.currentUserRoleIds, role_selectors_1.selectAllRoles, function (userRoleIds, allRoles) {
    return getPermissionsIdsFrom(userRoleIds, allRoles);
});
exports.checkHasUserPermission = function (permissionId) { return store_1.createSelector(exports.currentUserPermissionsIds, function (ids) {
    return ids.some(function (id) { return id === permissionId; });
}); };
exports.currentUserPermissions = store_1.createSelector(exports.currentUserPermissionsIds, permission_selectors_1.selectAllPermissions, function (permissionIds, allPermissions) {
    var result = [];
    lodash_1.each(permissionIds, function (id) {
        var userPermission = lodash_1.find(allPermissions, function (elem) { return elem.id === id; });
        if (userPermission) {
            result.push(userPermission);
        }
    });
    return result;
});
function getPermissionsIdsFrom(userRolesIds, allRoles) {
    if (userRolesIds === void 0) { userRolesIds = []; }
    if (allRoles === void 0) { allRoles = []; }
    var userRoles = [];
    lodash_1.each(userRolesIds, function (id) {
        var userRole = lodash_1.find(allRoles, function (role) { return role.id === id; });
        if (userRole) {
            userRoles.push(userRole);
        }
    });
    var result = [];
    lodash_1.each(userRoles, function (role) {
        lodash_1.each(role.permissions, function (id) {
            if (!lodash_1.some(result, function (gid) { return gid === id; })) {
                result.push(id);
            }
        });
    });
    return result;
}

//# sourceMappingURL=auth.selectors.js.map
