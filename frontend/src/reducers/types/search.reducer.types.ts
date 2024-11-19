import {
  GET_SEARCH_HISTORY,
  GET_POPULAR_SEARCHES,
  ADD_TO_SEARCH_HISTORY,
  REMOVE_FROM_SEARCH_HISTORY,
  CLEAN_SEARCH_HISTORY,
} from '../../actions/types';
import { Search } from '../../utils/types/Search';

export interface SearchState {
  searchHistory: Search[];
  popularRecipeSearches: Search[];
  popularUserSearches: Search[];
}

interface GetSearchHistoryAction {
  type: typeof GET_SEARCH_HISTORY;
  payload: { searchHistory: Search[] };
}

interface GetPopularSearchesAction {
  type: typeof GET_POPULAR_SEARCHES;
  payload: {
    popularRecipeSearches: Search[];
    popularUserSearches: Search[];
  };
}

interface AddToSearchHistoryAction {
  type: typeof ADD_TO_SEARCH_HISTORY;
  payload: { search: Search };
}

interface RemoveFromSearchHistoryAction {
  type: typeof REMOVE_FROM_SEARCH_HISTORY;
  payload: { searchId: number };
}

interface CleanSearchHistoryAction {
  type: typeof CLEAN_SEARCH_HISTORY;
}

export type SearchActionTypes =
  | GetSearchHistoryAction
  | GetPopularSearchesAction
  | AddToSearchHistoryAction
  | RemoveFromSearchHistoryAction
  | CleanSearchHistoryAction;
