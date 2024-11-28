import { Dispatch } from 'redux';
import axios from 'axios';
import {
  CLEAN_SEARCH_HISTORY,
  GET_POPULAR_SEARCHES,
  GET_SEARCH_HISTORY,
  REMOVE_FROM_SEARCH_HISTORY,
} from './types';
import i18n from '../translations/i18n';
import { toast } from 'react-toastify';

export const getSearchHistory =
  () => async (dispatch: Dispatch) => {
    try {
      const userToken = JSON.parse(
        localStorage.getItem('token') as string
      );
      const response = await axios.get(
        import.meta.env.VITE_BACKEND_URL +
          `/search/search-history`,
        {
          headers: {
            Authorization: `Bearer ${userToken.token}`,
          },
        }
      );
      dispatch({
        type: GET_SEARCH_HISTORY,
        payload: response.data,
      });

      return response.data;
    } catch (error) {
      toast(i18n.t(error.response.data.message), {
        type: error.response.data.severity,
      });
      console.log(error);
    }
  };

export const getPopularSearches =
  () => async (dispatch: Dispatch) => {
    try {
      const userToken = JSON.parse(
        localStorage.getItem('token') as string
      );
      const response = await axios.get(
        import.meta.env.VITE_BACKEND_URL +
          '/search/popular-searches',
        {
          headers: {
            Authorization: `Bearer ${userToken.token}`,
          },
        }
      );
      dispatch({
        type: GET_POPULAR_SEARCHES,
        payload: response.data,
      });
    } catch (error) {
      toast(i18n.t(error.response.data.message), {
        type: error.response.data.severity,
      });
      console.log(error);
    }
  };

export const removeFromSearchHistory =
  (searchId: number) => async (dispatch: Dispatch) => {
    try {
      const userToken = JSON.parse(
        localStorage.getItem('token') as string
      );

      await axios.delete(
        import.meta.env.VITE_BACKEND_URL +
          `/search/search-history/${searchId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken.token}`,
          },
        }
      );
      dispatch({
        type: REMOVE_FROM_SEARCH_HISTORY,
        payload: searchId,
      });
    } catch (error) {
      toast(i18n.t(error.response.data.message), {
        type: error.response.data.severity,
      });
      console.log(error);
    }
  };

export const cleanSearchHistory =
  () => async (dispatch: Dispatch) => {
    try {
      const userToken = JSON.parse(
        localStorage.getItem('token') as string
      );

      await axios.delete(
        import.meta.env.VITE_BACKEND_URL +
          `/search/search-history`,
        {
          headers: {
            Authorization: `Bearer ${userToken.token}`,
          },
        }
      );
      dispatch({
        type: CLEAN_SEARCH_HISTORY,
      });
    } catch (error) {
      toast(i18n.t(error.response.data.message), {
        type: error.response.data.severity,
      });
      console.log(error);
    }
  };
