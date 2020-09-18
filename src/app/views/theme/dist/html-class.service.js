"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var objectPath = require("object-path");
var rxjs_1 = require("rxjs");
var HtmlClassService = /** @class */ (function () {
    function HtmlClassService() {
        this.loaded = [];
        this.onClassesUpdated$ = new rxjs_1.BehaviorSubject(this.classes);
    }
    HtmlClassService.prototype.setConfig = function (layoutConfig) {
        this.config = this.preInit(layoutConfig);
        // scope list of classes
        this.classes = {
            header: [],
            header_container: [],
            header_mobile: [],
            header_menu: [],
            aside_menu: [],
            subheader: [],
            subheader_container: [],
            content: [],
            content_container: [],
            footer_container: []
        };
        this.attrs = {
            aside_menu: {}
        };
        // init base layout
        this.initLayout();
        this.initLoader();
        // init header and subheader menu
        this.initHeader();
        this.initSubheader();
        // init content
        this.initContent();
        // init aside and aside menu
        this.initAside();
        // init footer
        this.initFooter();
        this.initSkins();
        this.onClassesUpdated$.next(this.classes);
    };
    HtmlClassService.prototype.getClasses = function (path, toString) {
        if (path) {
            var classes = objectPath.get(this.classes, path) || '';
            if (toString && Array.isArray(classes)) {
                return classes.join(' ');
            }
            return classes.toString();
        }
        return this.classes;
    };
    HtmlClassService.prototype.getAttributes = function (path) {
        return this.attrs[path];
    };
    HtmlClassService.prototype.preInit = function (layout) {
        var updatedLayout = Object.assign({}, layout);
        var subheaderFixed = objectPath.get(updatedLayout, 'subheader.fixed');
        var headerSelfFixedDesktop = objectPath.get(updatedLayout, 'header.self.fixed.desktop');
        if (subheaderFixed && headerSelfFixedDesktop) {
            updatedLayout.subheader.style = 'solid';
        }
        else {
            updatedLayout.subheader.fixed = false;
        }
        return layout;
    };
    HtmlClassService.prototype.initLayout = function () {
        var selfBodyBackgroundImage = objectPath.get(this.config, 'self.body.background-image');
        if (selfBodyBackgroundImage) {
            document.body.style.backgroundImage = "url(\"" + selfBodyBackgroundImage + "\")";
        }
        var selfBodyClass = ((objectPath.get(this.config, 'self.body.class')) || '').toString();
        if (selfBodyClass) {
            var bodyClasses = selfBodyClass.split(' ');
            bodyClasses.forEach(function (cssClass) { return document.body.classList.add(cssClass); });
        }
    };
    HtmlClassService.prototype.initLoader = function () {
    };
    HtmlClassService.prototype.initHeader = function () {
        // Fixed header
        var headerSelfFixedDesktop = objectPath.get(this.config, 'header.self.fixed.desktop');
        if (headerSelfFixedDesktop) {
            document.body.classList.add('header-fixed');
            objectPath.push(this.classes, 'header', 'header-fixed');
        }
        else {
            document.body.classList.add('header-static');
        }
        var headerSelfFixedMobile = objectPath.get(this.config, 'header.self.fixed.mobile');
        if (headerSelfFixedMobile) {
            document.body.classList.add('header-mobile-fixed');
            objectPath.push(this.classes, 'header_mobile', 'header-mobile-fixed');
        }
        // Menu
        var headerMenuSelfDisplay = objectPath.get(this.config, 'header.menu.self.display');
        var headerMenuSelfLayout = objectPath.get(this.config, 'header.menu.self.layout');
        if (headerMenuSelfDisplay) {
            objectPath.push(this.classes, 'header_menu', "header-menu-layout-" + headerMenuSelfLayout);
            if (objectPath.get(this.config, 'header.menu.self.rootArrow')) {
                objectPath.push(this.classes, 'header_menu', 'header-menu-root-arrow');
            }
        }
        if (objectPath.get(this.config, 'header.self.width') === 'fluid') {
            objectPath.push(this.classes, 'header_container', 'container-fluid');
        }
        else {
            objectPath.push(this.classes, 'header_container', 'container');
        }
    };
    HtmlClassService.prototype.initSubheader = function () {
        var subheaderDisplay = objectPath.get(this.config, 'subheader.display');
        if (subheaderDisplay) {
            document.body.classList.add('subheader-enabled');
        }
        else {
            return;
        }
        var subheaderFixed = objectPath.get(this.config, 'subheader.fixed');
        var headerSelfFixedDesktop = objectPath.get(this.config, 'header.self.fixed.desktop');
        if (subheaderFixed && headerSelfFixedDesktop) {
            document.body.classList.add('subheader-fixed');
        }
        var subheaderStyle = objectPath.get(this.config, 'subheader.style');
        if (subheaderStyle) {
            objectPath.push(this.classes, 'subheader', "subheader-" + subheaderStyle);
        }
        if (objectPath.get(this.config, 'subheader.width') === 'fluid') {
            objectPath.push(this.classes, 'subheader_container', 'container-fluid');
        }
        else {
            objectPath.push(this.classes, 'subheader_container', 'container');
        }
        if (objectPath.get(this.config, 'subheader.clear')) {
            objectPath.push(this.classes, 'subheader', 'mb-0');
        }
    };
    // Init Content
    HtmlClassService.prototype.initContent = function () {
        if (objectPath.get(this.config, 'content.fit-top')) {
            objectPath.push(this.classes, 'content', 'pt-0');
        }
        if (objectPath.get(this.config, 'content.fit-bottom')) {
            objectPath.push(this.classes, 'content', 'pb-0');
        }
        if (objectPath.get(this.config, 'content.width') === 'fluid') {
            objectPath.push(this.classes, 'content_container', 'container-fluid');
        }
        else {
            objectPath.push(this.classes, 'content_container', 'container');
        }
    };
    HtmlClassService.prototype.initAside = function () {
        if (objectPath.get(this.config, 'aside.self.display') !== true) {
            return;
        }
        // Enable Aside
        document.body.classList.add('aside-enabled');
        // Fixed Aside
        if (objectPath.get(this.config, 'aside.self.fixed')) {
            document.body.classList.add('aside-fixed');
            objectPath.push(this.classes, 'aside', 'aside-fixed');
        }
        else {
            document.body.classList.add('aside-static');
        }
        // Check Aside
        if (objectPath.get(this.config, 'aside.self.display') !== true) {
            return;
        }
        // Default fixed
        if (objectPath.get(this.config, 'aside.self.minimize.default')) {
            document.body.classList.add('aside-minimize');
        }
        if (objectPath.get(this.config, 'aside.self.minimize.hoverable')) {
            document.body.classList.add('aside-minimize-hoverable');
        }
        var asideMenuDropdown = objectPath.get(this.config, 'aside.menu.dropdown');
        if (asideMenuDropdown) {
            objectPath.push(this.classes, 'aside_menu', 'aside-menu-dropdown');
            // tslint:disable-next-line
            this.attrs['aside_menu']['data-menu-dropdown'] = '1';
        }
        // Scrollable Menu
        if (asideMenuDropdown !== true) {
            // tslint:disable-next-line
            this.attrs['aside_menu']['data-menu-scroll'] = '1';
        }
        else {
            // tslint:disable-next-line
            this.attrs['aside_menu']['data-menu-scroll'] = '0';
        }
        var asideMenuSubmenuDropdownHoverTimout = objectPath.get(this.config, 'aside.menu.submenu.dropdown.hover-timeout');
        if (asideMenuSubmenuDropdownHoverTimout) {
            // tslint:disable-next-line
            this.attrs['aside_menu']['data-menu-dropdown-timeout'] = asideMenuSubmenuDropdownHoverTimout;
        }
    };
    HtmlClassService.prototype.initFooter = function () {
        // Fixed header
        if (objectPath.get(this.config, 'footer.fixed') === true) {
            document.body.classList.add('footer-fixed');
        }
        if (objectPath.get(this.config, 'footer.width') === 'fluid') {
            objectPath.push(this.classes, 'footer_container', 'container-fluid');
        }
        else {
            objectPath.push(this.classes, 'footer_container', 'container');
        }
    };
    HtmlClassService.prototype.initSkins = function () {
        var headerSelfTheme = objectPath.get(this.config, 'header.self.theme') || '';
        var brandSelfTheme = objectPath.get(this.config, 'brand.self.theme') || '';
        var asideSelfDisplay = objectPath.get(this.config, 'aside.self.display');
        if (asideSelfDisplay === false) {
            document.body.classList.add("brand-" + headerSelfTheme);
        }
        else {
            document.body.classList.add("brand-" + brandSelfTheme);
        }
    };
    HtmlClassService = __decorate([
        core_1.Injectable()
    ], HtmlClassService);
    return HtmlClassService;
}());
exports.HtmlClassService = HtmlClassService;

//# sourceMappingURL=html-class.service.js.map
