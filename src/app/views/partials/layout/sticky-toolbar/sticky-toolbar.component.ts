import {Component} from '@angular/core';
import {LayoutConfigService, OffcanvasOptions} from '../../../../core/_base/layout';

@Component({
  selector: 'app-sticky-toolbar',
  templateUrl: './sticky-toolbar.component.html',
  styleUrls: ['./sticky-toolbar.component.scss'],
})
export class StickyToolbarComponent {

  demoPanelOptions: OffcanvasOptions = {
    overlay: true,
    baseClass: 'offcanvas',
    placement: 'right',
    closeBy: 'kt_demo_panel_close',
    toggleBy: 'kt_demo_panel_toggle'
  };

  baseHref: string;

  constructor(private layoutConfigService: LayoutConfigService) {
    this.baseHref = '';
  }

  isActiveDemo(demo) {
    return demo === this.layoutConfigService.getConfig('demo');
  }
}
