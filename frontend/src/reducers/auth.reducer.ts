import { LOGIN, LOGOUT, REGISTER } from '../actions/types';
import { AuthActionTypes, AuthState } from './types/reducer.types';

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token') || null,
};

const authReducer = (
  state = initialState,
  action: AuthActionTypes
): AuthState => {
  switch (action.type) {
    case REGISTER:
    case LOGIN:
      // eslint-disable-next-line no-case-declarations
      const { token, user } = action.payload;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      return {
        user,
        token,
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
