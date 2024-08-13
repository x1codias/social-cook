export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';

export interface AuthState {
  user: User | null;
  token: string | null;
}
export interface User {
  id: string;
  username: string;
  email: string;
  photo?: string;
  biography?: string;
}

export interface AuthPayload {
  user: User;
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
