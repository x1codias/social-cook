import axios from 'axios';
import { LOGIN, LOGOUT, REGISTER } from './types';
import { Dispatch } from 'redux';
import { toast } from 'react-toastify';
import i18n from '../translations/i18n';

export const register =
  (registerData: FormData) =>
  async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + '/register',
        registerData
      );
      toast(i18n.t('welcomeChef'), { type: 'success' });
      dispatch({ type: REGISTER, payload: response.data });
    } catch (error) {
      toast(i18n.t(error.response.data.message), {
        type: error.response.data.severity,
      });
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
      toast(i18n.t('welcomeBackChef'), { type: 'success' });
      dispatch({ type: LOGIN, payload: response.data });
    } catch (error) {
      toast(i18n.t(error.response.data.message), {
        type: error.response.data.severity,
      });
      console.log(error);
    }
  };

export const logout =
  (userId: number) => async (dispatch: Dispatch) => {
    try {
      const userToken = JSON.parse(
        localStorage.getItem('token')
      );
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + '/logout',
        { userId },
        {
          headers: {
            Authorization: `Bearer ${userToken.token}`,
          },
        }
      );
      dispatch({ type: LOGOUT, payload: response.data });
    } catch (error) {
      toast(i18n.t(error.response.data.message), {
        type: error.response.data.severity,
      });
      console.log(error);
    }
  };

export const googleAuthentication =
  (accessToken: string) => async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + '/authGoogle',
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      dispatch({
        type: response.data.registered ? REGISTER : LOGIN,
        payload: response.data,
      });
    } catch (error) {
      toast(i18n.t(error.response.data.message), {
        type: error.response.data.severity,
      });
      console.log(error);
    }
  };

export const facebookAuthentication =
  (accessToken: string) => async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + '/authFacebook',
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      dispatch({
        type: response.data.registered ? REGISTER : LOGIN,
        payload: response.data,
      });
    } catch (error) {
      toast(i18n.t(error.response.data.message), {
        type: error.response.data.severity,
      });
      console.log(error);
    }
  };
