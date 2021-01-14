import { OptionsShips } from '../../shared/interfaces';
import { PaginatorActions, paginatorActionsType } from './paginator.actions';
export const paginatorNode = 'paginator';

export interface PaginatorState {
  options: OptionsShips;
}

const initializeState = (stateInitial: PaginatorState) => {
  const stateNotParse = localStorage.getItem(paginatorNode);
  if (stateNotParse) {
    const stateParse = JSON.parse(stateNotParse);
    return stateParse;
  } else {
    return stateInitial;
  }
};

const initialState: PaginatorState = initializeState({
  options: {offset: 0, limit: 5}
});

const retunStateAndAddLocaleStorage = (state: PaginatorState, storageStr: string = paginatorNode) => {
  localStorage.setItem(storageStr, JSON.stringify(state));
  return state;
};

export const paginatorReducer = (state = initialState, action: PaginatorActions) => {
  switch (action.type) {
    case paginatorActionsType.options:
      return retunStateAndAddLocaleStorage({
        ...state,
        options: action.payload
      });
    default: {
      return retunStateAndAddLocaleStorage(state);
    }
  }
};
