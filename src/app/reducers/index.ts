import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { filterNode, FilterState, filterReducer } from './filter/fiter.reducer';

export interface State {
  [filterNode]: FilterState;
}

export const reducers: ActionReducerMap<State> = {
  [filterNode]: filterReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
