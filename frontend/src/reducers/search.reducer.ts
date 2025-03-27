import {
  GET_SEARCH_HISTORY,
  GET_POPULAR_SEARCHES,
  ADD_TO_SEARCH_HISTORY,
  REMOVE_FROM_SEARCH_HISTORY,
  CLEAN_SEARCH_HISTORY,
} from '../actions/types';
import {
  SearchActionTypes,
  SearchState,
} from './types/search.reducer.types';

const initialState: SearchState = {
  searchHistory: [],
  popularUserSearches: [],
  popularRecipeSearches: [],
};

const searchReducer = (
  state = initialState,
  action: SearchActionTypes
): SearchState => {
  switch (action.type) {
    case GET_SEARCH_HISTORY:
      return {
        ...state,
        searchHistory: action.payload.searchHistory,
      };
    case GET_POPULAR_SEARCHES:
      return {
        ...state,
        popularUserSearches:
          action.payload.popularUserSearches,
        popularRecipeSearches:
          action.payload.popularRecipeSearches,
      };
    case ADD_TO_SEARCH_HISTORY: {
      const updatedSearchHistory = [...state.searchHistory];
      if (state.searchHistory.length === 5) {
        updatedSearchHistory.shift();
      }

      updatedSearchHistory.push();

      return {
        ...state,
        searchHistory: updatedSearchHistory,
      };
    }
    case REMOVE_FROM_SEARCH_HISTORY: {
      const searchId = action.payload.searchId;
      const updatedSearchHistory =
        state.searchHistory.filter(
          search => search.id !== searchId
        );
      return {
        ...state,
        searchHistory: updatedSearchHistory,
      };
    }
    case CLEAN_SEARCH_HISTORY:
      return {
        ...state,
        searchHistory: [],
      };
    default:
      return state;
  }
};

export default searchReducer;
