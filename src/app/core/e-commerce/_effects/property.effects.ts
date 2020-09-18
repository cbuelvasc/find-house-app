import { forkJoin, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { mergeMap, map, tap } from 'rxjs/operators';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';

import { PropertiesService } from '../_services/';
import { AppState } from '../../reducers';
import {
  PropertyActionTypes,
  PropertiesPageRequested,
  PropertiesPageLoaded,
  ManyPropertiesDeleted,
  OnePropertyDeleted,
  PropertiesPageToggleLoading,
  PropertiesStatusUpdated,
  PropertyUpdated,
  PropertyCreated,
  PropertyOnServerCreated
} from '../_actions/property.actions';
import { QueryParamsModel, QueryResultsModel } from '../../_base/crud';

@Injectable()
export class PropertyEffects {

  showPageLoadingDistpatcher = new PropertiesPageToggleLoading({ isLoading: true });
  showLoadingDistpatcher = new PropertiesPageToggleLoading({ isLoading: true });
  hideActionLoadingDistpatcher = new PropertiesPageToggleLoading({ isLoading: false });

  @Effect()
  loadPropertiesPage$: Observable<PropertiesPageLoaded> = this.actions$.pipe(
    ofType<PropertiesPageRequested>(PropertyActionTypes.PropertiesPageRequested),
    mergeMap(({ payload }) => {
      this.store.dispatch(this.showPageLoadingDistpatcher);
      const requestToServer = this.propertiesService.findProperties(payload.page);
      const lastQuery = of(payload.page);
      return forkJoin([requestToServer, lastQuery]);
    }),
    map(response => {
      const result: QueryResultsModel = response[0];
      const lastQuery: QueryParamsModel = response[1];
      return new PropertiesPageLoaded({
        properties: result.items,
        totalCount: result.totalCount,
        page: lastQuery
      });
    }),
  );

  @Effect()
  deleteproperty$: Observable<PropertiesPageToggleLoading> = this.actions$.pipe(
    ofType<OnePropertyDeleted>(PropertyActionTypes.OnePropertyDeleted),
    mergeMap(({ payload }) => {
      this.store.dispatch(this.showLoadingDistpatcher);
      return this.propertiesService.deleteProperty(payload.id);
    }
    ),
    map(() => {
      return this.hideActionLoadingDistpatcher;
    }),
  );

  @Effect()
  deleteProperties$: Observable<PropertiesPageToggleLoading> = this.actions$.pipe(
    ofType<ManyPropertiesDeleted>(PropertyActionTypes.ManyPropertiesDeleted),
    mergeMap(({ payload }) => {
      this.store.dispatch(this.showLoadingDistpatcher);
      return this.propertiesService.deleteProperties(payload.ids);
    }
    ),
    map(() => {
      return this.hideActionLoadingDistpatcher;
    }),
  );

  /*@Effect()
  updatePropertiesStatus$: Observable<PropertiesPageToggleLoading> = this.actions$.pipe(
    ofType<PropertiesStatusUpdated>(PropertyActionTypes.PropertiesStatusUpdated),
    mergeMap(({ payload }) => {
      this.store.dispatch(this.showLoadingDistpatcher);
      return this.propertiesService.updateStatusForProperty(payload.properties, payload.status);
    }),
    map(() => {
      return this.hideActionLoadingDistpatcher;
    }),
  );*/

  @Effect()
  updateProperty$: Observable<PropertiesPageToggleLoading> = this.actions$.pipe(
    ofType<PropertyUpdated>(PropertyActionTypes.PropertyUpdated),
    mergeMap(({ payload }) => {
      this.store.dispatch(this.showLoadingDistpatcher);
      return this.propertiesService.updateProperty(payload.property);
    }),
    map(() => {
      return this.hideActionLoadingDistpatcher;
    }),
  );

  @Effect()
  createProperty$: Observable<PropertiesPageToggleLoading> = this.actions$.pipe(
    ofType<PropertyOnServerCreated>(PropertyActionTypes.PropertyOnServerCreated),
    mergeMap(({ payload }) => {
      this.store.dispatch(this.showLoadingDistpatcher);
      return this.propertiesService.createProperty(payload.property).pipe(
        tap(res => {
          this.store.dispatch(new PropertyCreated({ property: res }));
        })
      );
    }),
    map(() => {
      return this.hideActionLoadingDistpatcher;
    }),
  );

  constructor(private actions$: Actions, private propertiesService: PropertiesService, private store: Store<AppState>) {
  }
}
