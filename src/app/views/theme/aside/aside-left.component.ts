import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import * as objectPath from 'object-path';

import { LayoutConfigService, MenuAsideService, MenuOptions, OffcanvasOptions } from '../../../core/_base/layout';
import { HtmlClassService } from '../html-class.service';

@Component({
  selector: 'app-aside-left',
  templateUrl: './aside-left.component.html',
  styleUrls: ['./aside-left.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsideLeftComponent implements OnInit, AfterViewInit {
  private offcanvas: any;

  @ViewChild('asideMenuOffcanvas', { static: true }) asideMenuOffcanvas: ElementRef;
  @ViewChild('asideMenu', { static: true }) asideMenu: ElementRef;

  asideLogo = '';
  asideClasses = '';
  currentRouteUrl = '';
  insideTm: any;
  outsideTm: any;

  menuCanvasOptions: OffcanvasOptions = {
    baseClass: 'aside',
    overlay: true,
    closeBy: 'kt_aside_close_btn',
    toggleBy: {
      target: 'kt_aside_mobile_toggle',
      state: 'mobile-toggle-active'
    }
  };

  menuOptions: MenuOptions = {
    submenu: {
      desktop: {
        default: 'dropdown',
      },
      tablet: 'accordion',
      mobile: 'accordion'
    },
    accordion: {
      expandAll: false
    }
  };

  constructor(
    public htmlClassService: HtmlClassService,
    public menuAsideService: MenuAsideService,
    public layoutConfigService: LayoutConfigService,
    private router: Router,
    private render: Renderer2,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngAfterViewInit(): void {
  }

  ngOnInit() {
    this.currentRouteUrl = this.router.url.split(/[?#]/)[0];
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        this.currentRouteUrl = this.router.url.split(/[?#]/)[0];
        this.mobileMenuClose();
        this.cdr.markForCheck();
      });
    const config = this.layoutConfigService.getConfig();

    if (objectPath.get(config, 'aside.menu.dropdown')) {
      this.render.setAttribute(this.asideMenu.nativeElement, 'data-ktmenu-dropdown', '1');
      // tslint:disable-next-line:max-line-length
      this.render.setAttribute(this.asideMenu.nativeElement, 'data-ktmenu-dropdown-timeout', objectPath.get(config, 'aside.menu.submenu.dropdown.hover-timeout'));
    }
    this.asideClasses = this.htmlClassService.getClasses('aside', true).toString();
    this.asideLogo = this.getAsideLogo();
    setTimeout(() => {
      this.offcanvas = new KTOffcanvas(this.asideMenuOffcanvas.nativeElement, this.menuCanvasOptions);
    });
  }

  getAsideLogo() {
    let result = 'logo-light.png';
    const brandSelfTheme = this.layoutConfigService.getConfig('brand.self.theme') || '';
    if (brandSelfTheme === 'light') {
      result = 'logo-dark.png';
    }
    return `./assets/media/logos/${result}`;
  }

  isMenuItemIsActive(item): boolean {
    if (item.submenu) {
      return this.isMenuRootItemIsActive(item);
    }

    if (!item.page) {
      return false;
    }
    return this.currentRouteUrl.indexOf(item.page) !== -1;
  }

  isMenuRootItemIsActive(item): boolean {
    let result = false;
    for (const subItem of item.submenu) {
      result = this.isMenuItemIsActive(subItem);
      if (result) {
        return true;
      }
    }
    return false;
  }

  mouseEnter(e: Event) {
    if (document.body.classList.contains('aside-fixed')) {
      if (this.outsideTm) {
        clearTimeout(this.outsideTm);
        this.outsideTm = null;
      }

      this.insideTm = setTimeout(() => {
        if (document.body.classList.contains('aside-minimize') && KTUtil.isInResponsiveRange('desktop')) {
          this.render.removeClass(document.body, 'aside-minimize');
          this.render.addClass(document.body, 'aside-minimize-hover');
        }
      }, 50);
    }
  }

  mouseLeave(e: Event) {
    if (document.body.classList.contains('aside-fixed')) {
      if (this.insideTm) {
        clearTimeout(this.insideTm);
        this.insideTm = null;
      }

      this.outsideTm = setTimeout(() => {
        // if the left aside menu is expand
        if (document.body.classList.contains('aside-minimize-hover') && KTUtil.isInResponsiveRange('desktop')) {
          // hide back the left aside menu
          this.render.removeClass(document.body, 'aside-minimize-hover');
          this.render.addClass(document.body, 'aside-minimize');
        }
      }, 100);
    }
  }

  getItemCssClasses(item) {
    let classes = 'menu-item';

    if (objectPath.get(item, 'submenu')) {
      classes += ' menu-item-submenu';
    }

    if (!item.submenu && this.isMenuItemIsActive(item)) {
      classes += ' menu-item-active menu-item-here';
    }

    if (item.submenu && this.isMenuItemIsActive(item)) {
      classes += ' menu-item-open menu-item-here';
    }

    // custom class for menu item
    const customClass = objectPath.get(item, 'custom-class');
    if (customClass) {
      classes += ' ' + customClass;
    }

    if (objectPath.get(item, 'icon-only')) {
      classes += ' menu-item-icon-only';
    }

    return classes;
  }

  getItemAttrSubmenuToggle(item) {
    let toggle = 'hover';
    if (objectPath.get(item, 'toggle') === 'click') {
      toggle = 'click';
    } else if (objectPath.get(item, 'submenu.type') === 'tabs') {
      toggle = 'tabs';
    } else {
      // submenu toggle default to 'hover'
    }

    return toggle;
  }


  mobileMenuClose() {
    if (KTUtil.isBreakpointDown('lg') && this.offcanvas) {
      this.offcanvas.hide();
    }
  }
}
