import { DialogService, StickyDirective } from '../../../../../core/_base/layout';
import {
	AfterViewInit,
	Component,
	ElementRef,
	HostBinding,
	HostListener,
	Inject,
	Input,
	OnDestroy,
	OnInit,
	PLATFORM_ID,
	ViewChild
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
	selector: 'app-portlet-header',
	styleUrls: ['portlet-header.component.scss'],
	template: `
		<div class="card-title" [hidden]="noTitle">
			<span class="card-icon" #refIcon [hidden]="hideIcon || !icon">
				<ng-content *ngIf="!icon" select="[ktPortletIcon]"></ng-content>
				<i *ngIf="icon" [ngClass]="icon"></i>
			</span>
			<ng-content *ngIf="!title" select="[ktPortletTitle]"></ng-content>
			<h3 *ngIf="title" class="card-label" [innerHTML]="title"></h3>
		</div>
		<div class="card-toolbar" #refTools [hidden]="hideTools">
			<ng-content select="[ktPortletTools]"></ng-content>
		</div>`
})
export class PortletHeaderComponent implements OnInit, AfterViewInit, OnDestroy {

	@Input() class: string;
	@Input() title: string;
	@Input() icon: string;
	@Input() noTitle: boolean;
	@Input() sticky: boolean;
	@Input() viewLoading$: Observable<boolean>;
	viewLoading = false;
	@HostBinding('class') classes = 'card-header';
	@HostBinding('attr.ktSticky') stickyDirective: StickyDirective;
	@ViewChild('refIcon', { static: true }) refIcon: ElementRef;
	hideIcon: boolean;
	@ViewChild('refTools', { static: true }) refTools: ElementRef;
	hideTools: boolean;

	private lastScrollTop = 0;
	private subscriptions: Subscription[] = [];
	private isScrollDown = false;

	constructor(private el: ElementRef, @Inject(PLATFORM_ID) private platformId: string, private dialogService: DialogService) {
		this.stickyDirective = new StickyDirective(this.el, this.platformId);
	}

	@HostListener('window:resize', ['$event'])
	onResize() {
		this.updateStickyPosition();
	}

	@HostListener('window:scroll', ['$event'])
	onScroll() {
		this.updateStickyPosition();
		const st = window.pageYOffset || document.documentElement.scrollTop;
		this.isScrollDown = st > this.lastScrollTop;
		this.lastScrollTop = st <= 0 ? 0 : st;
	}

	updateStickyPosition() {
		if (this.sticky) {
			Promise.resolve(null).then(() => {
				const headerElement = document.querySelector('.header') as HTMLElement;
				const subheaderElement = document.querySelector('.subheader') as HTMLElement;
				const headerMobileElement = document.querySelector('.header-mobile') as HTMLElement;
				let height = 0;
				if (headerElement != null) {
					if (window.getComputedStyle(headerElement).height === '0px') {
						height += headerMobileElement.offsetHeight;
					} else {
						if (document.body.classList.contains('header-minimize-topbar')) {
							height = 60;
						} else {
							if (document.body.classList.contains('header-fixed')) {
								height += headerElement.offsetHeight;
							}
							if (document.body.classList.contains('subheader-fixed')) {
								height += subheaderElement.offsetHeight;
							}
						}
					}
				}
				this.stickyDirective.marginTop = height;
			});
		}
	}

	ngOnInit() {
		if (this.sticky) {
			this.stickyDirective.ngOnInit();
		}
	}

	ngAfterViewInit(): void {
		this.classes += this.class ? ' ' + this.class : '';
		this.hideIcon = this.refIcon.nativeElement.children.length === 0;
		this.hideTools = this.refTools.nativeElement.children.length === 0;
		if (this.sticky) {
			this.updateStickyPosition();
			this.stickyDirective.ngAfterViewInit();
		}
		if (this.viewLoading$) {
			const loadingSubscription = this.viewLoading$.subscribe(res => this.toggleLoading(res));
			this.subscriptions.push(loadingSubscription);
		}
	}

	toggleLoading(_incomingValue: boolean) {
		this.viewLoading = _incomingValue;
		if (_incomingValue && !this.dialogService.checkIsShown()) {
			this.dialogService.show();
		}
		if (!this.viewLoading && this.dialogService.checkIsShown()) {
			this.dialogService.hide();
		}
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(sb => sb.unsubscribe());
		if (this.sticky) {
			this.stickyDirective.ngOnDestroy();
		}
	}
}
