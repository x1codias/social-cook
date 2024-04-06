import axios from 'axios';
import { LOGIN } from './types';
import { Dispatch } from 'redux';

export const login =
  (loginData: { identifier: string; password: string }) =>
  async (dispatch: Dispatch) => {
    try {
      console.log(loginData);
      const response = await axios.post(
        process.env.BACKEND_URL + '/api/login',
        loginData
      );
      dispatch({ type: LOGIN, payload: response.data });
    } catch (error) {
      // Handle error
    }
  };
