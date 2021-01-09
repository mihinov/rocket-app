import { Action } from '@ngrx/store';

export enum filterActionsType {
  checkbox = `[filter] checkbox`,
  radio = `[filter] radio`,
  text = `[filter] text`
}

export class FilterCheckboxAction implements Action {
  readonly type = filterActionsType.checkbox;
  constructor(public payload: string[]) {}
}

export class FilterRadioAction implements Action {
  readonly type = filterActionsType.radio;
  constructor(public payload: string) {}
}

export class FilterTextAction implements Action {
  readonly type = filterActionsType.text;
  constructor(public payload: string) {}
}

export type FilterActions = FilterCheckboxAction | FilterRadioAction | FilterTextAction;
