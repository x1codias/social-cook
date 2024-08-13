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
      console.log(import.meta.env.VITE_BACKEND_URL);
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + '/login',
        loginData
      );
      console.log(response);
      dispatch({ type: LOGIN, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };

export const logout = () => async (dispatch: Dispatch) => {
  try {
    const userId = JSON.parse(localStorage.getItem('user') as string).id;
    const response = await axios.post(
      import.meta.env.VITE_BACKEND_URL + '/logout',
      userId
    );
    dispatch({ type: LOGOUT, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};
