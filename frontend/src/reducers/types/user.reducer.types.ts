import {
  GET_USERS,
  GET_USERS_SEARCH_DROPDOWN,
} from '../../actions/types';
import { Account } from '../../utils/types/Account';

export interface UserState {
  scrollData: {
    users: Account[] | [];
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
    page: number;
  };
  searchDropdownUsers: Account[];
  user: Account | null;
}

export interface UserPayload {
  users: Account[] | [];
  total: number;
}

interface GetUsersAction {
  type: typeof GET_USERS;
  payload: UserPayload;
}

interface GetUsersSearchDropdownAction {
  type: typeof GET_USERS_SEARCH_DROPDOWN;
  payload: UserPayload;
}

export type UserActionTypes =
  | GetUsersAction
  | GetUsersSearchDropdownAction;
