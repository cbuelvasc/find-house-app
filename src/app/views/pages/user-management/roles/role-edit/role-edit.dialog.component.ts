import { Component, OnInit, Inject, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, of, Subscription } from 'rxjs';
import { each, find, some } from 'lodash';
import { Update } from '@ngrx/entity';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../../core/reducers';

import {
	Role,
	Permission,
	selectRoleById,
	RoleUpdated,
	selectAllPermissions,
	selectLastCreatedRoleId,
	RoleOnServerCreated
} from '../../../../../core/auth';
import { delay } from 'rxjs/operators';

@Component({
	selector: 'app-role-edit-dialog',
	templateUrl: './role-edit.dialog.component.html',
	changeDetection: ChangeDetectionStrategy.Default,
})
export class RoleEditDialogComponent implements OnInit, OnDestroy {

	role: Role;
	role$: Observable<Role>;
	hasFormErrors = false;
	viewLoading = false;
	loadingAfterSubmit = false;
	allPermissions$: Observable<Permission[]>;
	rolePermissions: Permission[] = [];

	private componentSubscriptions: Subscription;

	constructor(
		public dialogRef: MatDialogRef<RoleEditDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private store: Store<AppState>) {

	}

	ngOnInit() {
		if (this.data.roleId) {
			this.role$ = this.store.pipe(select(selectRoleById(this.data.roleId)));
		} else {
			const newRole = new Role();
			newRole.clear();
			this.role$ = of(newRole);
		}
		this.role$.subscribe(res => {
			if (!res) {
				return;
			}
			this.role = new Role();
			this.role.id = res.id;
			this.role.title = res.title;
			this.role.permissions = res.permissions;
			this.role.isCoreRole = res.isCoreRole;

			this.allPermissions$ = this.store.pipe(select(selectAllPermissions));
			this.loadPermissions();
		});
	}

	ngOnDestroy() {
		if (this.componentSubscriptions) {
			this.componentSubscriptions.unsubscribe();
		}
	}

	loadPermissions() {
		this.allPermissions$.subscribe(_allPermissions => {
			if (!_allPermissions) {
				return;
			}
			const mainPermissions = _allPermissions.filter(el => !el.parentId);
			mainPermissions.forEach((element: Permission) => {
				const hasUserPermission = this.role.permissions.some(t => t === element.id);
				const rootPermission = new Permission();
				rootPermission.clear();
				rootPermission.isSelected = hasUserPermission;
				rootPermission._children = [];
				rootPermission.id = element.id;
				rootPermission.level = element.level;
				rootPermission.parentId = element.parentId;
				rootPermission.title = element.title;
				const children = _allPermissions.filter(el => el.parentId && el.parentId === element.id);
				children.forEach(child => {
					const hasUserChildPermission = this.role.permissions.some(t => t === child.id);
					const childPermission = new Permission();
					childPermission.clear();
					childPermission.isSelected = hasUserChildPermission;
					childPermission._children = [];
					childPermission.id = child.id;
					childPermission.level = child.level;
					childPermission.parentId = child.parentId;
					childPermission.title = child.title;
					rootPermission._children.push(childPermission);
				});
				this.rolePermissions.push(rootPermission);
			});
		});
	}

	preparePermissionIds(): string[] {
		const result = [];
		each(this.rolePermissions, (_root: Permission) => {
			if (_root.isSelected) {
				result.push(_root.id);
				each(_root._children, (_child: Permission) => {
					if (_child.isSelected) {
						result.push(_child.id);
					}
				});
			}
		});
		return result;
	}

	prepareRole(): Role {
		const _role = new Role();
		_role.id = this.role.id;
		_role.permissions = this.preparePermissionIds();
		// each(this.assignedRoles, (_role: Role) => _user.roles.push(_role.id));
		_role.title = this.role.title;
		_role.isCoreRole = this.role.isCoreRole;
		return _role;
	}

	onSubmit() {
		this.hasFormErrors = false;
		this.loadingAfterSubmit = false;
		/** check form */
		if (!this.isTitleValid()) {
			this.hasFormErrors = true;
			return;
		}

		const editedRole = this.prepareRole();
		if (editedRole.id) {
			this.updateRole(editedRole);
		} else {
			this.createRole(editedRole);
		}
	}

	updateRole(_role: Role) {
		this.loadingAfterSubmit = true;
		this.viewLoading = true;
		/* Server loading imitation. Remove this on real code */
		const updateRole: Update<Role> = {
			id: this.role.id,
			changes: _role
		};
		this.store.dispatch(new RoleUpdated({
			partialrole: updateRole,
			role: _role
		}));
		of(undefined).subscribe(() => { // Remove this line
			this.viewLoading = false;
			this.dialogRef.close({
				_role,
				isEdit: true
			});
		}); // Remove this line
	}

	createRole(_role: Role) {
		this.loadingAfterSubmit = true;
		this.viewLoading = true;
		this.store.dispatch(new RoleOnServerCreated({ role: _role }));
		this.componentSubscriptions = this.store.pipe(
			delay(1000), // Remove this line
			select(selectLastCreatedRoleId)
		).subscribe(res => {
			if (!res) {
				return;
			}

			this.viewLoading = false;
			this.dialogRef.close({
				_role,
				isEdit: false
			});
		});
	}

	onAlertClose($event) {
		this.hasFormErrors = false;
	}

	isSelectedChanged($event, permission: Permission) {
		if (permission._children.length === 0 && permission.isSelected) {
			const _root = find(this.rolePermissions, (item: Permission) => item.id === permission.parentId);
			if (_root && !_root.isSelected) {
				_root.isSelected = true;
			}
			return;
		}

		if (permission._children.length === 0 && !permission.isSelected) {
			const _root = find(this.rolePermissions, (item: Permission) => item.id === permission.parentId);
			if (_root && _root.isSelected) {
				if (!some(_root._children, (item: Permission) => item.isSelected === true)) {
					_root.isSelected = false;
				}
			}
			return;
		}

		if (permission._children.length > 0 && permission.isSelected) {
			each(permission._children, (item: Permission) => item.isSelected = true);
			return;
		}

		if (permission._children.length > 0 && !permission.isSelected) {
			each(permission._children, (item: Permission) => {
				item.isSelected = false;
			});
			return;
		}
	}

	getTitle(): string {
		if (this.role && this.role.id) {
			return `Edit role '${this.role.title}'`;
		}
		return 'New role';
	}

	isTitleValid(): boolean {
		return (this.role && this.role.title && this.role.title.length > 0);
	}
}
