import { Dispatch } from 'redux';
import axios from 'axios';
import {
  CREATE_RECIPE,
  DELETE_RECIPE,
  GET_RECIPE,
  GET_RECIPES,
} from './types';
import i18n from '../translations/i18n';
import { toast } from 'react-toastify';

export const getRecipe =
  (recipeId: number) => async (dispatch: Dispatch) => {
    try {
      const userToken = JSON.parse(
        localStorage.getItem('token') as string
      );
      const response = await axios.get(
        import.meta.env.VITE_BACKEND_URL +
          `/recipes/${recipeId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken.token}`,
          },
        }
      );
      dispatch({
        type: GET_RECIPE,
        payload: response.data,
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

export const getRecipes =
  (limit: number, offset: number) =>
  async (dispatch: Dispatch) => {
    try {
      const userToken = JSON.parse(
        localStorage.getItem('token') as string
      );
      const response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + '/recipes',
        {
          params: {
            limit: limit.toString(),
            offset: offset.toString(),
          },
          headers: {
            Authorization: `Bearer ${userToken.token}`,
          },
        }
      );
      dispatch({
        type: GET_RECIPES,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const createRecipe =
  (recipeData: FormData) => async (dispatch: Dispatch) => {
    try {
      const userToken = JSON.parse(
        localStorage.getItem('token') as string
      );

      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + '/recipes',
        recipeData,
        {
          headers: {
            Authorization: `Bearer ${userToken.token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      toast(i18n.t('recipeCreated'), { type: 'success' });
      dispatch({
        type: CREATE_RECIPE,
        payload: response.data,
      });
    } catch (error) {
      toast(i18n.t(error.response.data.message), {
        type: error.response.data.severity,
      });
      console.log(error);
    }
  };

export const deleteRecipe =
  (recipeId: number) => async (dispatch: Dispatch) => {
    try {
      const userToken = JSON.parse(
        localStorage.getItem('token') as string
      );
      await axios.delete(
        import.meta.env.VITE_BACKEND_URL +
          `/recipes/${recipeId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken.token}`,
          },
        }
      );
      dispatch({
        type: DELETE_RECIPE,
        payload: { id: recipeId },
      });
    } catch (error) {
      console.log(error);
    }
  };
