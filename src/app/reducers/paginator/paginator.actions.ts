import { Action } from '@ngrx/store';
import { OptionsShips } from '../../shared/interfaces';
export enum paginatorActionsType {
  options = `[paginator] options`,
}

export class PaginatorOptionsAction implements Action {
  readonly type = paginatorActionsType.options;
  constructor(public payload: OptionsShips) {}
}

export type PaginatorActions = PaginatorOptionsAction;
