import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PaginatorState, paginatorNode } from './paginator.reducer';

export const selectPaginatorFeature = createFeatureSelector<PaginatorState>(paginatorNode);

export const selectOptionsPaginator = createSelector(
  selectPaginatorFeature,
  (state: PaginatorState) => state.options
);
