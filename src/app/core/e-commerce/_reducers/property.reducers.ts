import { createFeatureSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';

import { PropertyActions, PropertyActionTypes } from '../_actions/property.actions';
import { PropertyModel } from '../_models/property.model';
import { QueryParamsModel } from '../../_base/crud';

export interface PropertiesState extends EntityState<PropertyModel> {

  listLoading: boolean;

  actionsloading: boolean;

  totalCount: number;

  lastQuery: QueryParamsModel;

  lastCreatedPropertyId: string;

  showInitWaitingMessage: boolean;
}

export const adapter: EntityAdapter<PropertyModel> = createEntityAdapter<PropertyModel>();

export const initialPropertiesState: PropertiesState = adapter.getInitialState({
  listLoading: false,
  actionsloading: false,
  totalCount: 0,
  lastQuery: new QueryParamsModel({}),
  lastCreatedPropertyId: undefined,
  showInitWaitingMessage: true
});

export function propertiesReducer(state = initialPropertiesState, action: PropertyActions): PropertiesState {

  switch (action.type) {
    case PropertyActionTypes.PropertiesPageToggleLoading:
      return {
        ...state, listLoading: action.payload.isLoading, lastCreatedPropertyId: undefined
      };
    case PropertyActionTypes.PropertiesActionToggleLoading:
      return {
        ...state, actionsloading: action.payload.isLoading
      };
    case PropertyActionTypes.PropertyOnServerCreated:
      return {
        ...state
      };
    case PropertyActionTypes.PropertyCreated:
      return adapter.addOne(action.payload.property, {
        ...state, lastCreatedPropertyId: action.payload.property.id
      });
    case PropertyActionTypes.PropertyUpdated:
      return adapter.updateOne(action.payload.partialProperty, state);
    case PropertyActionTypes.PropertiesStatusUpdated: {
      // tslint:disable-next-line
      const _partialProperties: Update<PropertyModel>[] = [];
      // tslint:disable-next-line
      for (let i = 0; i < action.payload.properties.length; i++) {
        _partialProperties.push({
          id: action.payload.properties[i].id,
          changes: {
            // status: action.payload.status
          }
        });
      }
      return adapter.updateMany(_partialProperties, state);
    }
    case PropertyActionTypes.OnePropertyDeleted:
      return adapter.removeOne(action.payload.id, state);
    case PropertyActionTypes.ManyPropertiesDeleted:
      return adapter.removeMany(action.payload.ids, state);
    case PropertyActionTypes.PropertiesPageCancelled:
      return {
        ...state, listLoading: false, lastQuery: new QueryParamsModel({})
      };
    case PropertyActionTypes.PropertiesPageLoaded:
      return adapter.addMany(action.payload.properties, {
        ...initialPropertiesState,
        totalCount: action.payload.totalCount,
        listLoading: false,
        lastQuery: action.payload.page,
        showInitWaitingMessage: false
      });
    default:
      return state;
  }
}

export const getPropertiestate = createFeatureSelector<PropertyModel>('properties');

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();
