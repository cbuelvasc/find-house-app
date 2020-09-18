import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DialogService {
  private dialog: any;
  private currentState: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {
    this.dialog = new KTDialog({ type: 'loader', placement: 'top center', message: 'Loading ...' });
  }

  show() {
    this.currentState.next(true);
    this.dialog.show();
  }

  hide() {
    this.currentState.next(false);
    this.dialog.hide();
  }

  checkIsShown() {
    return this.currentState.value;
  }
}
