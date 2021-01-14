import { FilterActions, filterActionsType } from './filter.actions';
export const filterNode = 'filter';

export interface FilterState {
  radio: string;
  checkbox: string[];
  text: string;
}

const initializeState = (stateInitial: FilterState) => {
  const stateNotParse = localStorage.getItem(filterNode);
  if (stateNotParse) {
    const stateParse = JSON.parse(stateNotParse);
    return stateParse;
  } else {
    return stateInitial;
  }
};

const initialState: FilterState = initializeState({
  radio: 'High Speed Craft',
  checkbox: ['Port Canaveral', 'Port of Los Angeles'],
  text: '',
});

const retunStateAndAddLocaleStorage = (state: FilterState, storageStr: string = filterNode) => {
  localStorage.setItem(storageStr, JSON.stringify(state));
  return state;
};

export const filterReducer = (state = initialState, action: FilterActions) => {
  switch (action.type) {
    case filterActionsType.checkbox:
      return retunStateAndAddLocaleStorage({
        ...state,
        checkbox: action.payload
      });
    case filterActionsType.text:
      return retunStateAndAddLocaleStorage({
        ...state,
        text: action.payload
      });
    case filterActionsType.radio:
      return retunStateAndAddLocaleStorage({
        ...state,
        radio: action.payload
      });
    default: {
      return retunStateAndAddLocaleStorage(state);
    }
  }
};
