import { createFeatureSelector, createSelector } from '@ngrx/store';

import { each } from 'lodash';

import { PropertiesState } from '../_reducers/property.reducers';
import { PropertyModel } from '../_models/property.model';
import { HttpExtenstionsModel, QueryResultsModel } from '../../_base/crud';

export const selectPropertiesState = createFeatureSelector<PropertiesState>('properties');

export const selectPropertyById = (propertyId: string) => createSelector(
  selectPropertiesState,
  propertiesState => propertiesState.entities[propertyId]
);

export const selectPropertiesPageLoading = createSelector(
  selectPropertiesState,
  propertiesState => propertiesState.listLoading
);

export const selectPropertiesActionLoading = createSelector(
  selectPropertiesState,
  customersState => customersState.actionsloading
);

export const selectPropertiesPageLastQuery = createSelector(
  selectPropertiesState,
  propertiesState => propertiesState.lastQuery
);

export const selectLastCreatedPropertyId = createSelector(
  selectPropertiesState,
  propertiesState => propertiesState.lastCreatedPropertyId
);

export const selectPropertiesInitWaitingMessage = createSelector(
  selectPropertiesState,
  propertiesState => propertiesState.showInitWaitingMessage
);

export const selectPropertiesInStore = createSelector(
  selectPropertiesState,
  propertiesState => {
    const items: PropertyModel[] = [];
    each(propertiesState.entities, element => {
      items.push(element);
    });
    const httpExtension = new HttpExtenstionsModel();
    const result: PropertyModel[] =
      httpExtension.sortArray(items, propertiesState.lastQuery.sortField, propertiesState.lastQuery.sortOrder);
    return new QueryResultsModel(result, propertiesState.totalCount, '');
  }
);

export const selectHasPropertiesInStore = createSelector(
  selectPropertiesInStore,
  queryResult => {
    // tslint:disable-next-line
    if (!queryResult.totalCount) {
      return false;
    }
    // tslint:disable-next-line
    return true;
  }
);
