import axios from 'axios';
import { LOGIN, LOGOUT, REGISTER } from './types';
import { Dispatch } from 'redux';

export const register =
  (registerData: FormData) =>
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

export const googleAuthentication =
  (accessToken: string) => async (dispatch: Dispatch) => {
    console.log(accessToken);
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + '/loginGoogle',
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
      dispatch({
        type: response.data.registered ? REGISTER : LOGIN,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
