import {
  LOGIN,
  LOGOUT,
  REGISTER,
} from '../../actions/types';
import { Account } from '../../utils/types/Account';

export interface AuthState {
  user: Account | null;
  token: string | null;
}

export interface AuthPayload {
  user: Account;
  token: string;
}

interface LoginAction {
  type: typeof LOGIN;
  payload: AuthPayload;
}

interface RegisterAction {
  type: typeof REGISTER;
  payload: AuthPayload;
}

interface LogoutAction {
  type: typeof LOGOUT;
  payload: {};
}

export type AuthActionTypes =
  | LoginAction
  | RegisterAction
  | LogoutAction;
