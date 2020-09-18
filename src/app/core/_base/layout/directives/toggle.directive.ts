import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

export interface ToggleOptions {
  target?: string | any;
  targetState?: string;
  toggleState?: string;
}

@Directive({
  selector: '[appToggle]',
  exportAs: 'appToggle'
})
export class ToggleDirective implements AfterViewInit {

  @Input() options: ToggleOptions;

  toggle: any;

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit(): void {
    this.toggle = new KTToggle(this.el.nativeElement, this.options);
  }
}
