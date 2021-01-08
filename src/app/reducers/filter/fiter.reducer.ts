import { FilterActions, filterActionsType } from './filter.actions';
export const filterNode = 'filter';

export interface FilterState {
  radio: string;
  checkbox: string[];
  text: string;
}

const initialState: FilterState = {
  radio: 'High Speed Craft',
  text: '',
  checkbox: []
};

export const filterReducer = (state = initialState, action: FilterActions) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};
