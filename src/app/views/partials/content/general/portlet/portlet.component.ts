import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Observable } from 'rxjs';
import { PortletBodyComponent } from './portlet-body.component';
import { PortletHeaderComponent } from './portlet-header.component';
import { PortletFooterComponent } from './portlet-footer.component';

import { LayoutConfigService } from '../../../../../core/_base/layout';

export interface PortletOptions {
	test?: any;
}

@Component({
	selector: 'app-portlet',
	templateUrl: './portlet.component.html',
	exportAs: 'ktPortlet'
})
export class PortletComponent implements OnInit, AfterViewInit {

	@Input() loading$: Observable<boolean>;
	@Input() options: PortletOptions;
	@Input() class: string;
	@ViewChild('portlet', { static: true }) portlet: ElementRef;

	@ViewChild(PortletHeaderComponent, { static: true }) header: PortletHeaderComponent;
	@ViewChild(PortletBodyComponent, { static: true }) body: PortletBodyComponent;
	@ViewChild(PortletFooterComponent, { static: true }) footer: PortletFooterComponent;

	constructor(private el: ElementRef, public loader: LoadingBarService,
		private layoutConfigService: LayoutConfigService) {
		this.loader.complete();
	}

	ngOnInit() {
	}

	ngAfterViewInit() {
	}

}
