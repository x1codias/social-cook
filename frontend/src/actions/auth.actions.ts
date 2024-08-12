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
        process.env.BACKEND_URL + '/api/register',
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
        process.env.BACKEND_URL + '/api/login',
        loginData
      );
      dispatch({ type: LOGIN, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };

export const logout = () => async (dispatch: Dispatch) => {
  try {
    const response = await axios.post(process.env.BACKEND_URL + '/api/logout');
    dispatch({ type: LOGOUT, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};
