import axios from 'axios';
import { LOGIN, LOGOUT, REGISTER } from './types';
import { Dispatch } from 'redux';

export const register =
  (registerData: {
    username: string;
    email: string;
    password: string;
    photo?: string;
    biography?: string;
  }) =>
  async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + '/register',
        registerData
      );
      dispatch({ type: REGISTER, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };

export const login =
  (loginData: { identifier: string; password: string }) =>
  async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + '/login',
        loginData
      );
      dispatch({ type: LOGIN, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };

export const logout =
  (userId: number) => async (dispatch: Dispatch) => {
    try {
      const userToken = localStorage.getItem('token');
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + '/logout',
        { userId },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      dispatch({ type: LOGOUT, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
