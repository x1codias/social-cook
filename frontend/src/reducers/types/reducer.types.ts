import { Account } from '../../types/Account';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';

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

export type AuthActionTypes = LoginAction | RegisterAction | LogoutAction;
