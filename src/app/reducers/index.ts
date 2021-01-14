import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { filterNode, FilterState, filterReducer } from './filter/fiter.reducer';
import { paginatorNode, PaginatorState, paginatorReducer } from './paginator/paginator.reducer';

export interface State {
  [filterNode]: FilterState;
  [paginatorNode]: PaginatorState;
}

export const reducers: ActionReducerMap<State> = {
  [filterNode]: filterReducer,
  [paginatorNode]: paginatorReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
