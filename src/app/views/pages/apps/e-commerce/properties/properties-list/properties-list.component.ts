import { Component, OnInit, ElementRef, ViewChild, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { debounceTime, distinctUntilChanged, tap, skip, delay } from 'rxjs/operators';
import { fromEvent, merge, Observable, of, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../../../core/reducers';
import { SubheaderService } from '../../../../../../core/_base/layout';

import { LayoutUtilsService, MessageType, QueryParamsModel } from '../../../../../../core/_base/crud';
import {
	PropertyModel,
	PropertiesDataSource,
	PropertiesPageRequested,
	OnePropertyDeleted,
	ManyPropertiesDeleted,
	PropertiesStatusUpdated,
	selectProductsPageLastQuery
} from '../../../../../../core/e-commerce';

@Component({
	selector: 'app-properties-list',
	templateUrl: './properties-list.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertiesListComponent implements OnInit, OnDestroy {

	dataSource: PropertiesDataSource;

	displayedColumns = ['select', 'id', 'title', 'type', 'city', 'color', 'price', 'condition', 'status', 'actions'];

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

	@ViewChild('sort1', { static: true }) sort: MatSort;

	@ViewChild('searchInput', { static: true }) searchInput: ElementRef;

	filterStatus = '';

	filterCondition = '';

	lastQuery: QueryParamsModel;

	selection = new SelectionModel<PropertyModel>(true, []);

	propertiesResult: PropertyModel[] = [];

	private subscriptions: Subscription[] = [];

	constructor(
		public dialog: MatDialog,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private subheaderService: SubheaderService,
		private layoutUtilsService: LayoutUtilsService,
		private store: Store<AppState>
	) {

	}

	ngOnInit() {
		const sortSubscription = this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
		this.subscriptions.push(sortSubscription);
		const paginatorSubscriptions = merge(this.sort.sortChange, this.paginator.page)
			.pipe(
				tap(() => this.loadPropertiesList())
			)
			.subscribe();
		this.subscriptions.push(paginatorSubscriptions);

		const searchSubscription = fromEvent(this.searchInput.nativeElement, 'keyup')
			.pipe(
				debounceTime(150),
				distinctUntilChanged(),
				tap(() => {
					this.paginator.pageIndex = 0;
					this.loadPropertiesList();
				})
			)
			.subscribe();
		this.subscriptions.push(searchSubscription);

		this.subheaderService.setTitle('Properties');

		this.dataSource = new PropertiesDataSource(this.store);
		const entitiesSubscription = this.dataSource.entitySubject.pipe(
			skip(1),
			distinctUntilChanged()
		).subscribe(res => {
			this.propertiesResult = res;
		});
		this.subscriptions.push(entitiesSubscription);
		const lastQuerySubscription = this.store.pipe(select(selectProductsPageLastQuery))
			.subscribe(res => this.lastQuery = res);
		this.subscriptions.push(lastQuerySubscription);

		const routeSubscription = this.activatedRoute.queryParams.subscribe(params => {
			if (params.id) {
				this.restoreState(this.lastQuery, +params.id);
			}
			of(undefined).pipe(delay(1000)).subscribe(() => {
				this.loadPropertiesList();
			});
		});
		this.subscriptions.push(routeSubscription);
	}

	ngOnDestroy() {
		this.subscriptions.forEach(el => el.unsubscribe());
	}

	loadPropertiesList(): void {
		this.selection.clear();
		const queryParams = new QueryParamsModel(
			this.filterConfiguration(),
			this.sort.direction,
			this.sort.active,
			this.paginator.pageIndex,
			this.paginator.pageSize
		);
		this.store.dispatch(new PropertiesPageRequested({ page: queryParams }));
		this.selection.clear();
	}

	filterConfiguration(): any {
		const filter: any = {};
		filter.title = this.searchInput.nativeElement.value;
		return filter;
	}

	restoreState(queryParams: QueryParamsModel, id: number) {
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
	}

	deleteProduct(_item: PropertyModel) {
		const _title = 'Property Delete';
		const _description = 'Are you sure to permanently delete this property?';
		const _waitDesciption = 'Property is deleting...';
		const _deleteMessage = `Property has been deleted`;

		const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			this.store.dispatch(new OnePropertyDeleted({ id: _item.id }));
			this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
		});
	}

	deleteProducts() {
		const _title = 'Properties Delete';
		const _description = 'Are you sure to permanently delete selected properties?';
		const _waitDesciption = 'Properties are deleting...';
		const _deleteMessage = 'Selected properties have been deleted';

		const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			const idsForDeletion: string[] = [];
			// tslint:disable-next-line:prefer-for-of
			for (let i = 0; i < this.selection.selected.length; i++) {
				idsForDeletion.push(this.selection.selected[i].id);
			}
			this.store.dispatch(new ManyPropertiesDeleted({ ids: idsForDeletion }));
			this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
			this.selection.clear();
		});
	}

	fetchProducts() {
		// tslint:disable-next-line:prefer-const
		let messages = [];
		this.selection.selected.forEach(elem => {
			messages.push({
				text: `${elem.desc} ${elem.neighborhood}`,
				id: elem.id,
				status: elem.title
			});
		});
		this.layoutUtilsService.fetchElements(messages);
	}

	updateStatusForProducts() {
		const _title = 'Update status for selected properties';
		const _updateMessage = 'Status has been updated for selected properties';
		const _statuses = [{ value: 0, text: 'Selling' }, { value: 1, text: 'Sold' }];
		const _messages = [];

		/*this.selection.selected.forEach(elem => {
			_messages.push({
				// text: `${elem.manufacture} ${elem.model} ${elem.modelYear}`,
				// id: elem.VINCode,
				// status: elem.status,
				// statusTitle: this.getItemStatusString(elem.status),
				// statusCssClass: this.getItemCssClassByStatus(elem.status)
			});
		});*/

		const dialogRef = this.layoutUtilsService.updateStatusForEntities(_title, _statuses, _messages);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				this.selection.clear();
				return;
			}

			this.store.dispatch(new PropertiesStatusUpdated({
				status: +res,
				properties: this.selection.selected
			}));

			this.layoutUtilsService.showActionNotification(_updateMessage, MessageType.Update);
			this.selection.clear();
		});
	}

	editProduct(id: string): void {
		this.router.navigate(['../properties/edit', id], { relativeTo: this.activatedRoute });
	}

	createProperties(): void {
		this.router.navigateByUrl('/ecommerce/properties/add');
	}

	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.propertiesResult.length;
		return numSelected === numRows;
	}

	masterToggle(): void {
		if (this.isAllSelected()) {
			this.selection.clear();
		} else {
			this.propertiesResult.forEach(row => this.selection.select(row));
		}
	}

	getItemStatusString(status: number = 0): string {
		switch (status) {
			case 0:
				return 'Selling';
			case 1:
				return 'Sold';
		}
		return '';
	}

	getItemCssClassByStatus(status: number = 0): string {
		switch (status) {
			case 0:
				return 'success';
			case 1:
				return 'metal';
		}
		return '';
	}

	getItemConditionString(condition: number = 0): string {
		switch (condition) {
			case 0:
				return 'New';
			case 1:
				return 'Used';
		}
		return '';
	}

	getItemCssClassByCondition(condition: number = 0): string {
		switch (condition) {
			case 0:
				return 'danger';
			case 1:
				return 'primary';
		}
		return '';
	}
}
