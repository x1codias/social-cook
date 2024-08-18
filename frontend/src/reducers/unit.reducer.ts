import { GET_UNITS } from '../actions/types';
import {
  UnitActionTypes,
  UnitState,
} from './types/unit.reducer.types';

const initialState: UnitState = {
  scrollData: {
    units: [],
    total: 0,
    limit: 10,
    offset: 0,
    hasMore: true,
  },
};

const unitReducer = (
  state = initialState,
  action: UnitActionTypes
): UnitState => {
  switch (action.type) {
    case GET_UNITS:
      const { units, total } = action.payload;

      const newOffset =
        state.scrollData.offset + units.length;
      const hasMore = newOffset < total;

      return {
        ...state,
        scrollData: {
          units: [...state.scrollData.units, ...units],
          offset: newOffset,
          limit: 10,
          total: total,
          hasMore,
        },
      };
    default:
      return state;
  }
};

export default unitReducer;
