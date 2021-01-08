import { Action } from '@ngrx/store';

export enum filterActionsType {
  checkbox = `[filter] checkbox`,
  radio = `[filter] radio`,
  text = `[filter] text`
}

export class FilterCheckboxAction implements Action {
  readonly type = filterActionsType.checkbox;
  constructor(public payload: string) {}
}

export class FilterRadioAction implements Action {
  readonly type = filterActionsType.radio;
}

export class FilterTextAction implements Action {
  readonly type = filterActionsType.text;
}

export type FilterActions = FilterCheckboxAction | FilterRadioAction | FilterTextAction;
