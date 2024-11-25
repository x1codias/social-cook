import axios from 'axios';
import { Dispatch } from 'redux';
import {
  GET_USERS,
  GET_USERS_SEARCH_DROPDOWN,
} from './types';

export const getUsers =
  (searchTerm?: string) => async (dispatch: Dispatch) => {
    try {
      const userToken = JSON.parse(
        localStorage.getItem('token') as string
      );
      const response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + '/users',
        {
          params: {
            search: searchTerm || '',
          },
          headers: {
            Authorization: `Bearer ${userToken.token}`,
          },
        }
      );

      dispatch({
        type: GET_USERS_SEARCH_DROPDOWN,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const getUsersFeed =
  (
    limit: number = 10,
    offset: number = 0,
    searchTerm?: string
  ) =>
  async (dispatch: Dispatch) => {
    try {
      const userToken = JSON.parse(
        localStorage.getItem('token') as string
      );
      const response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + '/users/feed',
        {
          params: {
            limit: limit?.toString() || '',
            offset: offset?.toString() || '',
            search: searchTerm || '',
          },
          headers: {
            Authorization: `Bearer ${userToken.token}`,
          },
        }
      );

      dispatch({
        type: GET_USERS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
