import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-portlet-body',
	template: `<ng-content></ng-content>`
})
export class PortletBodyComponent implements OnInit {

	@HostBinding('class') classList = 'card-body';

	@Input() class: string;

	constructor() { }

	ngOnInit() {
		if (this.class) {
			this.classList += ' ' + this.class;
		}
	}
}
