import { Store, select } from '@ngrx/store';

import { QueryResultsModel, BaseDataSource } from '../../_base/crud';
import { AppState } from '../../reducers';

import { selectPropertiesInStore, selectPropertiesPageLoading, selectPropertiesInitWaitingMessage } from '../_selectors/property.selectors';

export class PropertiesDataSource extends BaseDataSource {

  constructor(private store: Store<AppState>) {
    super();
    this.loading$ = this.store.pipe(
      select(selectPropertiesPageLoading)
    );

    this.isPreloadTextViewed$ = this.store.pipe(
      select(selectPropertiesInitWaitingMessage)
    );

    this.store.pipe(
      select(selectPropertiesInStore)
    ).subscribe((response: QueryResultsModel) => {
      this.paginatorTotalSubject.next(response.totalCount);
      this.entitySubject.next(response.items);
    });
  }
}
