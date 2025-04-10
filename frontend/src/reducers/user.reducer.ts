import {
  GET_USERS,
  GET_USERS_SEARCH_DROPDOWN,
  RESET_SCROLL_USERS_DATA,
} from '../actions/types';
import {
  UserActionTypes,
  UserState,
} from './types/user.reducer.types';

const initialState: UserState = {
  scrollData: {
    users: [],
    total: 0,
    limit: 10,
    offset: 0,
    hasMore: true,
    page: 0,
  },
  searchDropdownUsers: [],
  user: null,
};

const userReducer = (
  state = initialState,
  action: UserActionTypes
): UserState => {
  switch (action.type) {
    case GET_USERS:
      const { users, total } = action.payload;

      const newOffset =
        state.scrollData.offset + users.length;
      const hasMore = newOffset < total;

      return {
        ...state,
        scrollData: {
          ...state.scrollData,
          users: [...state.scrollData.users, ...users], // Use spread to maintain immutability
          offset: newOffset,
          total: total,
          hasMore: hasMore,
          page: state.scrollData.page + 1, // Increment page only on successful fetch
        },
      };
    case GET_USERS_SEARCH_DROPDOWN: {
      const { users } = action.payload;

      return {
        ...state,
        searchDropdownUsers: users,
      };
    }
    case RESET_SCROLL_USERS_DATA:
      return {
        ...state,
        scrollData: {
          ...state.scrollData,
          users: [], // Reset recipes list
          offset: 0, // Reset offset
          total: 0, // Reset total
          hasMore: true, // Reset hasMore to allow new fetches
          page: 0, // Reset page count
        },
      };
    default:
      return state;
  }
};

export default userReducer;
