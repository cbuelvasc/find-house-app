import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { AppState } from '../../../../../core/reducers';
import { currentUser, Logout, User } from '../../../../../core/auth';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-profile4',
  templateUrl: './user-profile4.component.html',
})
export class UserProfile4Component implements OnInit {

  user$: Observable<User>;

  @Input() avatar = true;
  @Input() greeting = true;
  @Input() badge: boolean;
  @Input() icon: boolean;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.user$ = this.store.pipe(select(currentUser));
  }

  logout() {
    this.store.dispatch(new Logout());
  }
}
