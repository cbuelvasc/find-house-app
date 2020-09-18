import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { PropertyModel } from '../_models/property.model';
import { QueryParamsModel } from '../../_base/crud';

export enum PropertyActionTypes {
  PropertyOnServerCreated = '[Edit Property Component] Property On Server Created',
  PropertyCreated = '[Edit Property Component] Property Created',
  PropertyUpdated = '[Edit Property Component] Property Updated',
  PropertiesStatusUpdated = '[Properties List Page] Properties Status Updated',
  OnePropertyDeleted = '[Properties List Page] One Property Deleted',
  ManyPropertiesDeleted = '[Properties List Page] Many Selected Properties Deleted',
  PropertiesPageRequested = '[Properties List Page] Properties Page Requested',
  PropertiesPageLoaded = '[Properties API] Properties Page Loaded',
  PropertiesPageCancelled = '[Properties API] Properties Page Cancelled',
  PropertiesPageToggleLoading = '[Properties] Properties Page Toggle Loading',
  PropertiesActionToggleLoading = '[Properties] Properties Action Toggle Loading'
}

export class PropertyOnServerCreated implements Action {
  readonly type = PropertyActionTypes.PropertyOnServerCreated;

  constructor(public payload: { property: PropertyModel }) {
  }
}

export class PropertyCreated implements Action {
  readonly type = PropertyActionTypes.PropertyCreated;

  constructor(public payload: { property: PropertyModel }) {
  }
}

export class PropertyUpdated implements Action {
  readonly type = PropertyActionTypes.PropertyUpdated;

  constructor(public payload: {
    partialProperty: Update<PropertyModel>,
    property: PropertyModel
  }) {
  }
}

export class PropertiesStatusUpdated implements Action {
  readonly type = PropertyActionTypes.PropertiesStatusUpdated;

  constructor(public payload: {
    properties: PropertyModel[],
    status: number
  }) {
  }
}

export class OnePropertyDeleted implements Action {
  readonly type = PropertyActionTypes.OnePropertyDeleted;

  constructor(public payload: { id: string }) {
  }
}

export class ManyPropertiesDeleted implements Action {
  readonly type = PropertyActionTypes.ManyPropertiesDeleted;

  constructor(public payload: { ids: string[] }) {
  }
}

export class PropertiesPageRequested implements Action {
  readonly type = PropertyActionTypes.PropertiesPageRequested;

  constructor(public payload: { page: QueryParamsModel }) {
  }
}

export class PropertiesPageLoaded implements Action {
  readonly type = PropertyActionTypes.PropertiesPageLoaded;

  constructor(public payload: { properties: PropertyModel[], totalCount: number, page: QueryParamsModel }) {
  }
}

export class PropertiesPageCancelled implements Action {
  readonly type = PropertyActionTypes.PropertiesPageCancelled;
}

export class PropertiesPageToggleLoading implements Action {
  readonly type = PropertyActionTypes.PropertiesPageToggleLoading;

  constructor(public payload: { isLoading: boolean }) {
  }
}

export class PropertiesActionToggleLoading implements Action {
  readonly type = PropertyActionTypes.PropertiesActionToggleLoading;

  constructor(public payload: { isLoading: boolean }) {
  }
}

export type PropertyActions = PropertyOnServerCreated
  | PropertyCreated
  | PropertyUpdated
  | PropertiesStatusUpdated
  | OnePropertyDeleted
  | ManyPropertiesDeleted
  | PropertiesPageRequested
  | PropertiesPageLoaded
  | PropertiesPageCancelled
  | PropertiesPageToggleLoading
  | PropertiesActionToggleLoading;
