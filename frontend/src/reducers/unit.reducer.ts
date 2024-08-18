import { GET_UNITS } from '../actions/types';
import {
  UnitActionTypes,
  UnitState,
} from './types/unit.reducer.types';

const initialState: UnitState = {
  units: [],
};

const unitReducer = (
  state = initialState,
  action: UnitActionTypes
): UnitState => {
  switch (action.type) {
    case GET_UNITS:
      // eslint-disable-next-line no-case-declarations
      const { units } = action.payload;

      return {
        units,
      };
    default:
      return state;
  }
};

export default unitReducer;
