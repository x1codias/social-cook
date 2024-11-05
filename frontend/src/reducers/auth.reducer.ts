import { LOGIN, LOGOUT, REGISTER } from '../actions/types';
import {
  AuthActionTypes,
  AuthState,
} from './types/auth.reducer.types';

const initialState: AuthState = {
  user: null,
  token: null,
};

const authReducer = (
  state = initialState,
  action: AuthActionTypes
): AuthState => {
  switch (action.type) {
    case REGISTER:
    case LOGIN:
      const { token, user } = action.payload;
      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('user', JSON.stringify(user));
      return {
        user,
        token: token,
      };
    case LOGOUT:
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return {
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

export default authReducer;
