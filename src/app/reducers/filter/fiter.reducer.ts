import { FilterActions, filterActionsType } from './filter.actions';
export const filterNode = 'filter';

export interface FilterState {
  radio: string;
  checkbox: string[];
  text: string;
}

const initialState: FilterState = {
  radio: 'High Speed Craft',
  checkbox: [],
  text: '',
};

export const filterReducer = (state = initialState, action: FilterActions) => {
  switch (action.type) {
    case filterActionsType.checkbox:
      return {
        ...state,
        checkbox: action.payload
      };
    case filterActionsType.text:
      return {
        ...state,
        text: action.payload
      };
    case filterActionsType.radio:
      return {
        ...state,
        radio: action.payload
      };
    default: {
      return state;
    }
  }
};
