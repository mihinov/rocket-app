import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FilterState, filterNode } from './fiter.reducer';

export const selectFilterFeature = createFeatureSelector<FilterState>(filterNode);

export const selectCheckbox = createSelector(
  selectFilterFeature,
  (state: FilterState): string[] => state.checkbox
);

export const selectRadio = createSelector(
  selectFilterFeature,
  (state: FilterState): string => state.radio
);

export const selectText = createSelector(
  selectFilterFeature,
  (state: FilterState): string => state.text
);

export const selectAllFilterState = createSelector(
  selectFilterFeature,
  (state: FilterState): FilterState => state
);
